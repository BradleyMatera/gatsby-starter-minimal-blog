import React from "react";
import { withPrefix } from "gatsby";
import "./src/styles/global.css";

export const onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents([]);
};
