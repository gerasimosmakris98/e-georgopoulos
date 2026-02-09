import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    schema?: object;
}

export const SEO = ({
    title,
    description,
    keywords,
    image = '/og-image.svg',
    url,
    type = 'website',
    schema
}: SEOProps) => {
    const siteTitle = "Efstathios Georgopoulos | Financial Crime Compliance & Blockchain Expert";
    const defaultDescription = "Multilingual QA Analyst at Ebury & Blockchain Specialist. Expert in AML/CFT, Sanctions, and Crypto Forensics. Based in Madrid.";
    const defaultKeywords = "Efstathios Georgopoulos, Compliance, AML, Blockchain, Financial Crime, Madrid, Ebury, QA Analyst, Cryptocurrency";
    const siteUrl = "https://egeorgopoulos-b2e9b.web.app";

    const metaTitle = title ? `${title} | Efstathios Georgopoulos` : siteTitle;
    const metaDescription = description || defaultDescription;
    const metaKeywords = keywords || defaultKeywords;
    const metaUrl = url ? `${siteUrl}${url}` : siteUrl;
    const metaImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{metaTitle}</title>
            <meta name="title" content={metaTitle} />
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={metaUrl} />
            <meta property="twitter:title" content={metaTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={metaImage} />

            {/* Structured Data (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};
