import { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: object | object[];
}

const DEFAULT_TITLE = 'FRPD - Firm of Research, Policy and Development | Leading Research & Advisory Institute';
const DEFAULT_DESCRIPTION = 'The Firm of Research, Policy and Development (FRPD) is a premier institute advancing economic research, public policy innovation, data science, artificial intelligence, capacity building, and evidence-based decision-making.';
const DEFAULT_KEYWORDS = 'FRPD, Firm of Research Policy and Development, Economic Policy Pakistan, Public Policy Institute, Dr Shakeel Shahzad, Artificial Intelligence Policy, Data Science Pakistan, Business Tax Services, Fiscal Governance, Econometrics, Monetary Policy, Capacity Building, Policy Advisory';
const SITE_URL = 'https://frpd.org.pk';
const DEFAULT_OG_IMAGE = 'https://frpd.org.pk/assets/icons/logo.png';

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  jsonLd
}: SEOProps) {
  const fullTitle = title ? `${title} | FRPD - Firm of Research, Policy and Development` : DEFAULT_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const metaKeywords = keywords ? `${keywords}, ${DEFAULT_KEYWORDS}` : DEFAULT_KEYWORDS;
  const pageCanonical = canonicalUrl ? `${SITE_URL}${canonicalUrl}` : SITE_URL;
  const metaImage = ogImage ? (ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`) : DEFAULT_OG_IMAGE;

  useEffect(() => {
    // Update Title
    document.title = fullTitle;

    // Helper to update meta tag
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Set standard Meta Tags
    setMetaTag('name', 'description', metaDescription);
    setMetaTag('name', 'keywords', metaKeywords);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', 'Firm of Research, Policy and Development (FRPD)');
    setMetaTag('name', 'viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', metaDescription);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', pageCanonical);
    setMetaTag('property', 'og:image', metaImage);
    setMetaTag('property', 'og:site_name', 'FRPD - Firm of Research, Policy and Development');
    setMetaTag('property', 'og:locale', 'en_US');

    // Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', metaDescription);
    setMetaTag('name', 'twitter:image', metaImage);

    // Canonical Link
    setLinkTag('canonical', pageCanonical);

    // JSON-LD Structured Data Injection
    let scriptTag = document.querySelector('script[type="application/ld+json"]#seo-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('id', 'seo-jsonld');
      document.head.appendChild(scriptTag);
    }

    const defaultOrganizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'ResearchOrganization',
      'name': 'Firm of Research, Policy and Development (FRPD)',
      'alternateName': 'FRPD',
      'url': SITE_URL,
      'logo': DEFAULT_OG_IMAGE,
      'description': DEFAULT_DESCRIPTION,
      'founder': {
        '@type': 'Person',
        'name': 'Dr. Shakeel Shahzad',
        'jobTitle': 'Chief Executive Officer & Chief Economist',
        'sameAs': 'https://orcid.org/0000-0002-0731-4163'
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+92-51-255-4920',
        'contactType': 'customer support',
        'email': 'info@frpd.org.pk',
        'areaServed': 'PK',
        'availableLanguage': ['English', 'Arabic', 'French', 'German', 'Chinese']
      },
      'sameAs': [
        'https://orcid.org/0000-0002-0731-4163',
        'https://linkedin.com/company/frpd-pk',
        'https://facebook.com/frpdpk'
      ]
    };

    const combinedSchema = jsonLd
      ? (Array.isArray(jsonLd) ? [defaultOrganizationSchema, ...jsonLd] : [defaultOrganizationSchema, jsonLd])
      : defaultOrganizationSchema;

    scriptTag.textContent = JSON.stringify(combinedSchema);

  }, [title, description, keywords, canonicalUrl, ogImage, ogType, jsonLd, fullTitle, metaDescription, metaKeywords, pageCanonical, metaImage]);

  return null;
}
