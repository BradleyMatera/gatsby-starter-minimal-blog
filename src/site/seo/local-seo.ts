export const serviceAreaName = "Durand, Davis, Rockford, Freeport, and Northwest Illinois";
export const serviceAreaDescription =
  "Website design, web development, SEO services, and small business websites for Durand, Davis, Rockford, Freeport, and Northwest Illinois — remote collaboration available.";

export const serviceAreaPlaces = [
  "Durand, Illinois",
  "Davis, Illinois",
  "Rockford, Illinois",
  "Freeport, Illinois",
  "Pecatonica, Illinois",
  "Winnebago, Illinois",
  "Winnebago County, Illinois",
  "Stephenson County, Illinois",
  "Northwest Illinois",
];

export const localBreadcrumb = {
  name: "Web Developer in Durand and Davis, Illinois",
  path: "/web-developer-durand-davis-illinois/",
};

export const buildProfessionalServiceSchema = ({
  path,
  serviceName: _serviceName,
  description,
}: {
  path: string;
  serviceName: string;
  description: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Bradley Matera",
  url: `https://bradleymatera.dev${path}`,
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
    "Front-end development",
    "Full-stack web development",
  ],
  description,
  telephone: "+16502651193",
  email: "bradmatera@gmail.com",
  founder: {
    "@type": "Person",
    name: "Bradley Matera",
    url: "https://bradleymatera.dev",
  },
});
