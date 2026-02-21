/*
 * Smoke test: build the Gatsby site, then verify the main HTML contains a known heading.
 * This ensures the site boots and the home route renders stable metadata.
 */
const { execSync } = require("node:child_process");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");

const projectRoot = resolve(__dirname, "..");
const build = () => {
  execSync("npm run build", { cwd: projectRoot, stdio: "inherit" });
};

const verifyHome = () => {
  const indexPath = resolve(projectRoot, "public", "index.html");
  const html = readFileSync(indexPath, "utf8");
  const acceptedMarkers = [
    "Bradley Matera — Portfolio",
    "Bradley Matera — Full-stack and cloud systems",
  ];
  const found = acceptedMarkers.some((marker) => html.includes(marker));
  if (!found) {
    throw new Error(
      `Home page title marker not found. Expected one of: ${acceptedMarkers.join(" | ")}`
    );
  }
};

try {
  build();
  verifyHome();
  console.log("Smoke test passed: index.html contains the expected title.");
} catch (error) {
  console.error(error);
  process.exit(1);
}
