export const serviceAreaName = "Durand, Davis, and Northwest Illinois";
export const serviceAreaDescription =
  "Websites, front-end interfaces, and full-stack web development for Durand, Davis, and nearby Northwest Illinois communities, with remote collaboration available.";

export const serviceAreaPlaces = [
  "Durand, Illinois",
  "Davis, Illinois",
  "Winnebago County, Illinois",
  "Northwest Illinois",
];

export const localBreadcrumb = {
  name: "Web Developer in Durand and Davis, Illinois",
  path: "/web-developer-durand-davis-illinois/",
};

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
  "@type": "ProfessionalService",
  name: "Bradley Matera",
  url: `https://bradleymatera.dev${path}`,
  areaServed: serviceAreaPlaces.map((name) => ({
    "@type": "Place",
    name,
  })),
  serviceType: serviceName,
  description,
  email: "bradmatera@gmail.com",
  founder: {
    "@type": "Person",
    name: "Bradley Matera",
    url: "https://bradleymatera.dev",
  },
});
