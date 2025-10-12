// Schema.org structured data for SEO

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Dream Team Services",
  "alternateName": "DTS",
  "url": "https://dreamteamservices.com",
  "logo": "https://dreamteamservices.com/dts-logo.jpg",
  "description": "Dream Team Services provides world-class AI commercial ads, digital marketing, social media management, website development, and software development services.",
  "foundingDate": "2020",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "50-6-23, Vishnalayam Street, Jagannaickpur",
    "addressLocality": "Kakinada",
    "addressRegion": "Andhra Pradesh",
    "postalCode": "533002",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "16.9891",
    "longitude": "82.2475"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-XXX-XXX-XXXX",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Telugu", "Hindi"]
  },
  "sameAs": [
    "https://www.facebook.com/dreamteamservices",
    "https://www.instagram.com/dreamteamservices",
    "https://www.linkedin.com/company/dreamteamservices",
    "https://twitter.com/dreamteamservices"
  ]
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://dreamteamservices.com",
  "name": "Dream Team Services",
  "image": "https://dreamteamservices.com/dts-logo.jpg",
  "url": "https://dreamteamservices.com",
  "telephone": "+91-XXX-XXX-XXXX",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "50-6-23, Vishnalayam Street, Jagannaickpur",
    "addressLocality": "Kakinada",
    "addressRegion": "Andhra Pradesh",
    "postalCode": "533002",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "16.9891",
    "longitude": "82.2475"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.facebook.com/dreamteamservices",
    "https://www.instagram.com/dreamteamservices",
    "https://www.linkedin.com/company/dreamteamservices",
    "https://twitter.com/dreamteamservices"
  ]
};

export const servicesSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Commercial Ads",
    "provider": {
      "@type": "Organization",
      "name": "Dream Team Services",
      "url": "https://dreamteamservices.com"
    },
    "description": "Professional AI-powered commercial ad creation services including video production, script writing, and digital advertising campaigns.",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://dreamteamservices.com/services"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Digital Marketing",
    "provider": {
      "@type": "Organization",
      "name": "Dream Team Services",
      "url": "https://dreamteamservices.com"
    },
    "description": "Comprehensive digital marketing services including SEO, PPC, content marketing, email marketing, and analytics to grow your online presence.",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://dreamteamservices.com/services"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Social Media Management",
    "provider": {
      "@type": "Organization",
      "name": "Dream Team Services",
      "url": "https://dreamteamservices.com"
    },
    "description": "Complete social media management across Instagram, Facebook, LinkedIn, Twitter, and YouTube including content creation, posting, and engagement.",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://dreamteamservices.com/services"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Website Development",
    "provider": {
      "@type": "Organization",
      "name": "Dream Team Services",
      "url": "https://dreamteamservices.com"
    },
    "description": "Custom website development services including responsive design, e-commerce solutions, CMS integration, and progressive web applications.",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://dreamteamservices.com/services"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Software Development",
    "provider": {
      "@type": "Organization",
      "name": "Dream Team Services",
      "url": "https://dreamteamservices.com"
    },
    "description": "Professional software development services including custom applications, mobile apps, API development, and enterprise solutions.",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://dreamteamservices.com/services"
    }
  }
];

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Dream Team Services",
  "url": "https://dreamteamservices.com",
  "description": "Professional AI commercial ads, digital marketing, social media management, website development, and software development services in Kakinada, India.",
  "publisher": {
    "@type": "Organization",
    "name": "Dream Team Services",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dreamteamservices.com/dts-logo.jpg"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://dreamteamservices.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
