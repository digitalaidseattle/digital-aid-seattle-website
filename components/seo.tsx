// components/Seo.tsx
import Head from 'next/head';

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
}

export const Seo = ({ title, description, canonical }: SeoProps) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:type" content="website" />
    {canonical && <link rel="canonical" href={canonical} />}
  </Head>
);