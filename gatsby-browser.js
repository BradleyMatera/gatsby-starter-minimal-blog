
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./src/styles/global.css";

export const onClientEntry = () => {
  document.body.setAttribute('data-theme', 'light');
};
