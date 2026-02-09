// Keep SSR style order aligned with gatsby-browser to avoid cascade mismatches.
import "./src/styles/cyberpunk-theme.css";
import "./src/styles/cyberpunk-nav.css";
import "./src/styles/global.css";
import "./src/styles/vertical-nav.css";
import "./src/styles/media.css";

export const onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents([]);
};
