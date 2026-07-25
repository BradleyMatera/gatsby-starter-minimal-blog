export const SITE_URL = "https://bradleymatera.dev";

export const serviceAreaName = "Durand, Davis, Rockford, Freeport, Loves Park, Machesney Park, Byron, Roscoe, Rockton, South Beloit, Beloit, Janesville, and Northwest Illinois";
export const serviceAreaDescription =
  "Fast, accessible websites, local SEO, repairs, and website care for Northwest Illinois small businesses. Work directly with Bradley. Packages start at $447.";

export const serviceAreaPlaces = [
  "Durand, Illinois",
  "Davis, Illinois",
  "Rockford, Illinois",
  "Freeport, Illinois",
  "Pecatonica, Illinois",
  "Winnebago, Illinois",
  "Loves Park, Illinois",
  "Machesney Park, Illinois",
  "Byron, Illinois",
  "Roscoe, Illinois",
  "Rockton, Illinois",
  "South Beloit, Illinois",
  "Beloit, Wisconsin",
  "Janesville, Wisconsin",
  "Winnebago County, Illinois",
  "Stephenson County, Illinois",
  "Ogle County, Illinois",
  "Rock County, Wisconsin",
  "Northwest Illinois",
  "Southern Wisconsin",
];

export const localBreadcrumb = {
  name: "Web Developer in Durand and Davis, Illinois",
  path: "/web-developer-durand-davis-illinois/",
};

export const personSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/#bradley`,
  name: "Bradley F. Matera",
  url: `${SITE_URL}/about/`,
  email: "bradmatera@gmail.com",
  telephone: "+16083135373",
  jobTitle: "Web Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Durand",
    addressRegion: "IL",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.linkedin.com/in/bradmatera",
    "https://github.com/BradleyMatera",
    "https://dev.to/bradleymatera",
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Bradley Matera",
  publisher: { "@id": `${SITE_URL}/#bradley` },
  inLanguage: "en",
};

export const buildConnectedSchema = ({
  path,
  serviceName,
  description,
  offers,
}: {
  path: string;
  serviceName: string;
  description: string;
  offers?: Array<{
    name: string;
    price: string;
    priceCurrency: string;
    description?: string;
  }>;
}) => ({
  "@context": "https://schema.org",
  "@graph": [
    personSchema,
    websiteSchema,
    {
      "@type": "Service",
      "@id": `${SITE_URL}${path}#service`,
      name: serviceName,
      provider: { "@id": `${SITE_URL}/#bradley` },
      areaServed: serviceAreaPlaces.map((name) => ({
        "@type": "Place",
        name,
      })),
      url: `${SITE_URL}${path}`,
      description,
      ...(offers && offers.length > 0
        ? {
            offers: offers.map((o) => ({
              "@type": "Offer",
              name: o.name,
              price: o.price,
              priceCurrency: o.priceCurrency,
              ...(o.description ? { description: o.description } : {}),
            })),
          }
        : {}),
    },
  ],
});

export const buildProfessionalServiceSchema = ({
  path,
  serviceName,
  description,
}: {
  path: string;
  serviceName: string;
  description: string;
}) => ({
  "@context": "https://schema.org",
  "@graph": [
    personSchema,
    websiteSchema,
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}${path}#service`,
      name: serviceName,
      provider: { "@id": `${SITE_URL}/#bradley` },
      url: `${SITE_URL}${path}`,
      areaServed: serviceAreaPlaces.map((name) => ({
        "@type": "Place",
        name,
      })),
      serviceType: [
        "Web development",
        "Website design",
        "Website repair and maintenance",
        "SEO services",
        "Small business websites",
        "Local SEO",
        "Website accessibility",
      ],
      description,
      telephone: "+16083135373",
      email: "bradmatera@gmail.com",
      datePublished: "2024-01-15",
      dateModified: "2026-07-24",
    },
  ],
});

export const buildBreadcrumbSchema = (items: Array<{ name: string; path: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});
