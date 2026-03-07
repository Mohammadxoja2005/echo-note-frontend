
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

const SEO = ({
  title = "EchoNote - Voice to Text Notes | AI-Powered Voice Recording App",
  description = "Transform your voice into organized notes instantly with EchoNote. AI-powered voice recording and transcription for professionals, students, and content creators. Try free today!",
  keywords = "voice to text, voice notes, voice recording, transcription, AI transcription, note taking, voice memo, speech to text, audio notes, productivity app",
  image = "https://echonote.ink/hero.png",
  url = "https://echonote.ink",
  type = "website",
  structuredData
}: SEOProps) => {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "EchoNote",
    "description": "AI-powered voice recording and transcription app that transforms your voice into organized notes instantly",
    "url": "https://echonote.ink",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "15",
      "priceCurrency": "USD",
      "priceValidUntil": "2025-12-31"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    },
    "creator": {
      "@type": "Organization",
      "name": "EchoNote",
      "url": "https://echonote.ink",
      "logo": {
        "@type": "ImageObject",
        "url": "https://echonote.ink/hero.png"
      }
    },
    "featureList": [
      "Voice to text transcription",
      "AI-powered note organization",
      "Real-time recording",
      "Cross-platform compatibility",
      "Unlimited note storage"
    ],
    "screenshot": "https://echonote.ink/hero.png",
    "softwareVersion": "1.0",
    "releaseNotes": "Initial release with core voice transcription features"
  };

  // Add blog-specific structured data
  const blogStructuredData = type === "website" && url === "https://echonote.ink/blog" ? {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "EchoNote Blog",
    "description": "Tips, tutorials, and insights about voice-to-text technology and productivity",
    "url": "https://echonote.ink/blog",
    "publisher": {
      "@type": "Organization",
      "name": "EchoNote",
      "logo": {
        "@type": "ImageObject",
        "url": "https://echonote.ink/hero.png"
      }
    },
    "blogPost": [
      {
        "@type": "BlogPosting",
        "headline": "The Future of Voice-to-Text Technology",
        "url": "https://echonote.ink/blog/voice-to-text-future",
        "datePublished": "2024-01-15",
        "author": {
          "@type": "Organization",
          "name": "EchoNote Team"
        }
      },
      {
        "@type": "BlogPosting",
        "headline": "10 Productivity Tips Using Voice Notes",
        "url": "https://echonote.ink/blog/productivity-tips-voice-notes",
        "datePublished": "2024-01-10",
        "author": {
          "@type": "Organization",
          "name": "EchoNote Team"
        }
      },
      {
        "@type": "BlogPosting",
        "headline": "Mobile Voice Recording: Best Practices",
        "url": "https://echonote.ink/blog/mobile-voice-recording-best-practices",
        "datePublished": "2024-01-05",
        "author": {
          "@type": "Organization",
          "name": "EchoNote Team"
        }
      }
    ]
  } : null;

  const finalStructuredData = blogStructuredData || structuredData || defaultStructuredData;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="EchoNote" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="EchoNote" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@echonote" />
      <meta name="twitter:site" content="@echonote" />

      {/* Additional SEO */}
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="msapplication-TileColor" content="#8B5CF6" />
      <meta name="application-name" content="EchoNote" />
      
      {/* Language and locale */}
      <meta property="og:locale" content="en_US" />
      <meta name="language" content="en" />
      
      {/* Mobile optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="EchoNote" />

      {/* Additional meta tags for better SEO */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="MobileOptimized" content="320" />
      <meta name="generator" content="EchoNote" />
      <meta name="subject" content="Voice to Text Transcription" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
