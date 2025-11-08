import React from 'react';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  breadcrumbs?: BreadcrumbItem[];
}

/**
 * A component to manage SEO and metadata using React Helmet.
 *
 * @param {object} props - The properties for the component.
 * @param {string} [props.title] - The title of the page.
 * @param {string} [props.description] - The description of the page.
 * @param {string} [props.keywords] - The keywords for the page.
 * @param {string} [props.canonical] - The canonical URL of the page.
 * @param {string} [props.ogImage] - The Open Graph image for the page.
 * @param {Array<BreadcrumbItem>} [props.breadcrumbs] - An array of breadcrumb items.
 * @returns {JSX.Element} The rendered meta component.
 */
const Meta: React.FC<MetaProps> = ({
  title = "LOG_ON - AI Agent Marketplace | Voice-First Business Intelligence",
  description = "Deploy autonomous AI agents with LOG_ON to automate workflows, accelerate growth & transform your business. Enterprise-grade infrastructure for voice-first business intelligence.",
  keywords = "AI agents, business automation, voice AI, autonomous agents, workflow automation, enterprise AI, business intelligence, Developer Ecosystem, AI infrastructure, LOG_ON",
  canonical = "https://www.log-on.io",
  ogImage = "https://www.log-on.io/og-image.png",
  breadcrumbs
}) => {
  const siteName = "LOG_ON";
  const twitterHandle = "@log_on_ai";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={siteName} />

      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": siteName,
          "url": canonical,
          "logo": ogImage,
          "description": description,
          "sameAs": [
            "https://twitter.com/log_on_ai",
            "https://linkedin.com/company/log-on-ai",
            "https://github.com/log-on-ai"
          ],
          "founder": {
            "@type": "Person",
            "name": "LOG_ON Team"
          },
          "foundingDate": "2024",
          "slogan": "Voice-First Business Intelligence",
          "offers": {
            "@type": "AggregateOffer",
            "name": "AI Agent Marketplace",
            "description": "Deploy autonomous AI agents to automate workflows and accelerate growth"
          }
        })}
      </script>

      {/* BreadcrumbList Schema */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((bc, idx) => ({
              "@type": "ListItem",
              "position": idx + 1,
              "name": bc.name,
              "item": bc.item,
            })),
          })}
        </script>
      )}
    </Helmet>
  );
};

export default Meta;
