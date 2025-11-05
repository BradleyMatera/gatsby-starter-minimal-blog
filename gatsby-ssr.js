import React from "react";
import { withPrefix } from "gatsby";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./src/styles/global.css";
import interLatinWght from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2";
import spaceGroteskLatinWght from "@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2";

const fontPreloads = [
	{ href: interLatinWght, type: "font/woff2" },
	{ href: spaceGroteskLatinWght, type: "font/woff2" },
];

export const onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents(
		fontPreloads.map((font) =>
			React.createElement("link", {
				key: font.href,
				rel: "preload",
				href: withPrefix(font.href),
				as: "font",
				type: font.type,
				crossOrigin: "anonymous",
			})
		)
	);
};
