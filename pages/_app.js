import "../styles/globals.css";
// import "normalize.css/normalize.css";
import { SEO } from "../components/seo";
import { Menu } from "../components/interface/menu";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<SEO />
			<div className="App">
				<Menu className="Menu" />
				<Component {...pageProps} className="Main" />
			</div>
		</>
	);
}

export default MyApp;
