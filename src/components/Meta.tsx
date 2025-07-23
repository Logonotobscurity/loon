import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta: React.FC = () => {
  const title = "LOG_ON – Voice-First Business Intelligence";
  const description = "LOG_ON provides the infrastructure to build, deploy, and manage autonomous AI agents that streamline workflows, accelerate growth, and amplify human potential.";
  const url = "https://www.log-on.io";
  const imageUrl = `${url}/og-image.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default Meta;
