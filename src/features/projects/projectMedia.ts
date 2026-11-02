export type ProjectMedia = {
  src?: string;
  kind: "Interface" | "Documentation" | "Illustration";
  alt: string;
  caption: string;
  source: string;
  steps?: string[];
};

export const projectMedia: Record<string, ProjectMedia> = {
  "/projects/projecthub/": {
    kind: "Interface",
    src: "/images/projects/projecthub.jpg",
    alt: "ProjectHub public overview with its real embedded Scout recruiter assistant showing its welcome state",
    caption: "Public overview and embedded assistant; captured without sending a message.",
    source: "https://bradleymatera.github.io/ProjectHub/",
  },
  "https://codepen.io/student-account-bradley-matera": {
    kind: "Interface",
    src: "/images/projects/codepen.webp",
    alt: "The Myspace-themed interface experiment shown in Bradley Matera's public CodePen showcase",
    caption: "Myspace interface experiment, as previewed in the public CodePen showcase.",
    source: "https://codepen.io/student-account-bradley-matera",
  },
  "/projects/aws-serverless-metadata-workflow/": {
    kind: "Documentation",
    src: "/images/projects/aws-serverless-metadata-workflow.png",
    alt: "AWS Serverless Metadata Workflow public documentation, including its input, processing and output stages",
    caption: "Public project documentation; this preview is not a connected AWS deployment.",
    source: "https://bradleymatera.github.io/AWS-Serverless-Metadata-Workflow/",
  },
  "/projects/car-match/": {
    kind: "Interface",
    src: "/images/projects/car-match.png",
    alt: "Car-Match public sign-in interface with username, password and account actions",
    caption: "Public sign-in interface.",
    source: "https://bradleymatera.github.io/car-match/",
  },
  "/projects/interactive-pokedex/": {
    kind: "Interface",
    src: "/images/projects/interactive-pokedex.png",
    alt: "Interactive Pokédex explorer with search, type filters, Pokémon cards and a detail panel",
    caption: "Pokédex explorer interface.",
    source: "https://bradleymatera.github.io/Interactive-Pokedex/",
  },
  "/projects/triangle-shader-lab/": {
    kind: "Documentation",
    src: "/images/projects/triangle-shader-lab.png",
    alt: "WebGPU Lab landing page with an explicit Open the Lab action",
    caption: "Public WebGPU Lab overview; open the lab to run its graphics examples.",
    source: "https://bradleymatera.github.io/TriangleDemo/",
  },
  "/projects/securelearn-lms/": {
    kind: "Interface",
    src: "/images/projects/securelearn-lms.png",
    alt: "SecureLearn interface with courses, demos, a dashboard and secrets-management learning paths",
    caption: "Public SecureLearn learning interface.",
    source: "https://bradleymatera.github.io/EthicsFrontEndDemo/",
  },
  "/projects/cheesemath/": {
    kind: "Interface",
    src: "/images/projects/cheesemath.png",
    alt: "CheeseMath calculator suite with navigation to its calculator, advanced tools, regex analyzer and card obscurer",
    caption: "Public CheeseMath interface.",
    source: "https://bradleymatera.github.io/CheeseMath-Jest-Tests/",
  },
  "/projects/animal-sounds/": {
    kind: "Interface",
    src: "/images/projects/animal-sounds.png",
    alt: "Wildlife Sounds interface with habitat, animal and favorites navigation",
    caption: "Public wildlife soundboard interface.",
    source: "https://bradleymatera.github.io/AnimalSounds/",
  },
  "/projects/convo-ai/": {
    kind: "Documentation",
    src: "/images/projects/convo-ai.png",
    alt: "Convo-AI project overview with links to its features, demo, pipeline and installation guide",
    caption: "Public project overview; the voice assistant itself runs locally.",
    source: "https://bradleymatera.github.io/Convo-Ai/",
  },
  "/projects/obj-parser/": {
    kind: "Illustration",
    src: "/images/projects/obj-parser.svg",
    alt: "OBJ Parser architecture illustration: OBJ and optional MTL files pass through a Zig parser into verified binary output",
    caption: "Architecture illustration based on the project write-up.",
    source: "https://github.com/BradleyMatera/obj-parser",
    steps: ["OBJ + MTL files", "Zig parser", "Binary output", "Verification tools"],
  },
  "/projects/ciris-ai/": {
    kind: "Illustration",
    src: "/images/projects/ciris-ai.svg",
    alt: "CIRISNode contribution map illustration connecting JWT authentication, API endpoints, deferral handling and route refactoring",
    caption: "Contribution map illustration; areas are documented in the linked pull requests.",
    source: "https://github.com/CIRISAI/CIRISNode/pulls?q=is%3Apr+author%3ABradleyMatera",
    steps: ["JWT authentication", "API routes", "Deferral system", "Route refactoring"],
  },
};
