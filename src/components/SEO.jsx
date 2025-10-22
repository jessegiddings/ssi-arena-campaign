import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO component for managing meta tags dynamically per page
 * @param {Object} props - SEO properties
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Comma-separated keywords
 * @param {string} props.image - Social sharing image URL
 * @param {string} props.url - Canonical URL
 * @param {string} props.type - Open Graph type (default: website)
 */
export default function SEO({
  title = "Salt Spring Island Community Arena - Building Our Future Together",
  description = "Join the movement to build a world-class community arena on Salt Spring Island. Sign the petition, pledge your support, and help create a multi-sport facility with NHL-sized rink, fitness center, and community gathering space for all ages.",
  keywords = "Salt Spring Island, community arena, ice rink, recreation center, Salt Spring sports, community petition, fundraising, fitness center, youth programs, senior activities, SSI, Gulf Islands, hockey, figure skating, community development",
  image = "https://ssiarena.com/og-image.jpg",
  url = "https://ssiarena.com/",
  type = "website"
}) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}

// Pre-configured SEO for different pages
export const pageSEO = {
  home: {
    title: "Salt Spring Island Community Arena - Building Our Future Together",
    description: "Join the movement to build a world-class community arena on Salt Spring Island. Sign the petition, pledge your support, and help create a multi-sport facility with NHL-sized rink, fitness center, and community gathering space for all ages.",
    keywords: "Salt Spring Island, community arena, ice rink, recreation center, Salt Spring sports, SSI arena, Gulf Islands recreation, hockey rink, figure skating, community fitness",
    url: "https://ssiarena.com/"
  },
  petition: {
    title: "Sign the Petition - Salt Spring Island Community Arena",
    description: "Sign the petition to support building a community arena on Salt Spring Island. Add your voice to hundreds of supporters calling for a multi-purpose recreation facility for all ages and abilities.",
    keywords: "Salt Spring Island petition, arena petition, community support, sign petition, SSI arena support, recreation advocacy",
    url: "https://ssiarena.com/petition"
  },
  benefits: {
    title: "Community Benefits - Salt Spring Island Arena",
    description: "Discover the evidence-based health, safety, and economic benefits of a community arena. Research shows recreation facilities reduce crime, improve mental health, prevent falls in seniors, and save healthcare costs.",
    keywords: "community benefits, health benefits, recreation research, crime prevention, mental health, senior safety, physical activity, healthcare savings",
    url: "https://ssiarena.com/community-benefits"
  }
};
