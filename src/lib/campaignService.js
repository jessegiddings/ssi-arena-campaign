import { supabase } from './supabase.js'

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
    return { success: true }
  } catch (error) {
    console.error('Error submitting pledge:', error)
    return { success: false, error: error.message }
  }
}

// Get current campaign statistics
export async function getCampaignStats() {
  try {
    const { data, error } = await supabase
      .from('campaign_stats')
      .select('*')
      .single()

    if (error) throw error
    return {
      signatures: data.total_signatures,
      pledges: data.total_pledges,
      pledgeAmount: data.total_pledge_amount / 100, // Convert from cents
      signatureGoal: data.signature_goal,
      pledgeGoal: data.pledge_goal / 100, // Convert from cents
      lastUpdated: data.last_updated
    }
  } catch (error) {
    console.error('Error fetching campaign stats:', error)
    return null
  }
}

// Subscribe to real-time campaign stats updates
export function subscribeToStats(callback) {
  const subscription = supabase
    .channel('campaign-stats')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'campaign_stats'
      },
      (payload) => {
        if (payload.new) {
          const stats = {
            signatures: payload.new.total_signatures,
            pledges: payload.new.total_pledges,
            pledgeAmount: payload.new.total_pledge_amount / 100,
            signatureGoal: payload.new.signature_goal,
            pledgeGoal: payload.new.pledge_goal / 100,
            lastUpdated: payload.new.last_updated
          }
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