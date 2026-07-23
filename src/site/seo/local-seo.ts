export const serviceAreaName = "Durand, Davis, Rockford, Freeport, Loves Park, Machesney Park, Byron, Roscoe, Rockton, South Beloit, Beloit, Janesville, and Northwest Illinois";
export const serviceAreaDescription =
  "Web developer and website design for Rockford, Beloit, Freeport, and Northwest Illinois small businesses — SEO, repair, and custom builds.";

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
  dateModified: new Date().toISOString().split("T")[0],
  founder: {
    "@type": "Person",
    name: "Bradley Matera",
    url: "https://bradleymatera.dev",
  },
});
