import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  schema?: object;
}

const SEO = ({
  title = "Dream Team Services | AI Commercial Ads, Digital Marketing, Web & Software Development in Kakinada",
  description = "Dream Team Services provides world-class AI commercial ads, digital marketing, social media management, website development, and software development services in Kakinada, Andhra Pradesh. Transform your business with cutting-edge digital solutions.",
  keywords = "AI commercial ads, digital marketing services, social media management, website development, software development, Kakinada, Andhra Pradesh, web design, mobile app development, SEO services, digital transformation, brand strategy, custom software",
  image = "https://thedreamteamservices.com/images/Untitled%20design%20(26).png",
  url = "https://thedreamteamservices.com",
  type = "website",
  author = "Dream Team Services",
  publishedTime,
  modifiedTime,
  schema
}: SEOProps) => {
  const siteUrl = "https://thedreamteamservices.com";
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:secure_url" content={fullImageUrl} />
      <meta property="og:image:alt" content="Dream Team Services Logo" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:site_name" content="Dream Team Services" />
      <meta property="og:locale" content="en_IN" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content="Dream Team Services Logo" />
      <meta name="twitter:creator" content="@DreamTeamSrvcs" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN-AP" />
      <meta name="geo.placename" content="Kakinada" />
      <meta name="geo.position" content="16.9891;82.2475" />
      <meta name="ICBM" content="16.9891, 82.2475" />

      {/* Schema.org Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
