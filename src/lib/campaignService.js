import { supabase } from './supabase.js'
import { trackPetitionSignature, trackPledgeCommitment, trackNewsletterSignup } from './tracking.js'

// Submit a signature to the database
export async function submitSignature(signatureData) {
  try {
    const { data, error } = await supabase
      .from('signatures')
      .insert([
        {
          first_name: signatureData.firstName,
          last_name: signatureData.lastName,
          email: signatureData.email,
          postal_code: signatureData.postalCode,
          consent_petition: signatureData.consentPetition,
          consent_updates: signatureData.consentUpdates || false,
        }
      ])
      .select('id')
      .single()

    if (error) throw error

    // Track the conversion
    trackPetitionSignature(signatureData)

    // If they opted into updates, track newsletter signup
    if (signatureData.consentUpdates) {
      trackNewsletterSignup(signatureData)
    }

    return { success: true, signatureId: data.id }
  } catch (error) {
    console.error('Error submitting signature:', error)
    return { success: false, error: error.message }
  }
}

// Submit a pledge (linked to a signature)
export async function submitPledge(signatureId, pledgeData) {
  try {
    const { data, error } = await supabase
      .from('pledges')
      .insert([
        {
          signature_id: signatureId,
          amount: pledgeData.amount * 100, // Convert to cents
          pledge_tier: pledgeData.tier || null,
        }
      ])

    if (error) throw error

    // Track the pledge conversion
    trackPledgeCommitment(pledgeData.amount)

    return { success: true }
  } catch (error) {
    console.error('Error submitting pledge:', error)
    return { success: false, error: error.message }
  }
}

// Get current campaign statistics
export async function getCampaignStats() {
  try {
    // Count signatures directly from signatures table
    const { count: signatureCount, error: sigError } = await supabase
      .from('signatures')
      .select('*', { count: 'exact', head: true })

    if (sigError) throw sigError

    // Get pledge data and goals from campaign_stats if it exists
    const { data: statsData } = await supabase
      .from('campaign_stats')
      .select('*')
      .single()

    // Calculate total pledge amount directly from pledges table
    const { data: pledges, error: pledgeError } = await supabase
      .from('pledges')
      .select('amount')

    const totalPledgeAmount = pledges?.reduce((sum, pledge) => sum + (pledge.amount || 0), 0) || 0

    return {
      signatures: signatureCount || 0,
      pledges: pledges?.length || 0,
      pledgeAmount: totalPledgeAmount / 100, // Convert from cents
      signatureGoal: statsData?.signature_goal || 2000,
      pledgeGoal: (statsData?.pledge_goal || 15000000) / 100, // Convert from cents
      lastUpdated: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error fetching campaign stats:', error)
    return null
  }
}

// Subscribe to real-time campaign stats updates
export function subscribeToStats(callback) {
  const subscription = supabase
    .channel('campaign-updates')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'signatures'
      },
      async () => {
        // When signatures table changes, fetch fresh stats
        const stats = await getCampaignStats()
        if (stats) {
          callback(stats)
        }
      }
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'pledges'
      },
      async () => {
        // When pledges table changes, fetch fresh stats
        const stats = await getCampaignStats()
        if (stats) {
          callback(stats)
        }
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(subscription)
  }
}

// Get pledge tier info
export function getPledgeTier(amount) {
  const tiers = [
    { min: 25000, label: "Visionary", description: "Major" },
    { min: 10000, label: "Legacy", description: "$10,000" },
    { min: 5000, label: "Foundation", description: "$5,000" },
    { min: 2500, label: "Pillar", description: "$2,500" },
    { min: 1000, label: "Cornerstone", description: "$1,000" },
    { min: 500, label: "Builder", description: "$500" },
    { min: 250, label: "Champion", description: "$250" },
    { min: 100, label: "Advocate", description: "$100" },
    { min: 50, label: "Friend", description: "$50" },
    { min: 25, label: "Supporter", description: "$25" },
  ]

  for (const tier of tiers) {
    if (amount >= tier.min) {
      return tier
    }
  }
  return { label: "Supporter", description: "Custom" }
}