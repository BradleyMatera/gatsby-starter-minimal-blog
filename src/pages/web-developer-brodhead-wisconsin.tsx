import { createCityPage } from "../features/local-seo/CityPageTemplate";
import { NEW_CITY_CONFIGS } from "../features/local-seo/city-configs";

const config = NEW_CITY_CONFIGS.find((c) => c.slug === "web-developer-brodhead-wisconsin")!;
const { default: Page, Head } = createCityPage(config);

export default Page;
export { Head };
