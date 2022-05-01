import "../styles/globals.css";
// import "normalize.css/normalize.css";
import Head from "next/head";
import { Menu } from "../components/interface/menu";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				{/* Name */}
				<title>Covid Dashboard</title>
				<meta property="og:title" content="Covid Dashboard" />
				<meta name="apple-mobile-web-app-title" content="Covid Dashboard" />
				<meta name="application-name" content="Covid Dashboard" />

				{/* Description */}
				<meta
					name="description"
					content="A covid dashboard to keep you inform on your desired location."
				/>
				<meta
					property="og:description"
					content="A covid dashboard to keep you inform on your desired location."
				/>
				<meta
					name="twitter:card"
					content="A covid dashboard to keep you inform on your desired location."
				/>

				{/* Image */}
				<meta property="og:type" content="dashboard" />
				<meta property="og:url" content="https://miguel-cardoso.com" />
				<meta name="twitter:creator" content="@mncardoso" />

				{/* Image */}
				<meta
					property="og:image"
					content="https://s3.eu-north-1.amazonaws.com/web.miguel.cardoso/assets/og_light.png"
				/>
				{/* Favicon */}
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1a1a1a" />

				{/* Theme Color */}
				<meta name="theme-color" content="#1a1a1a" />
			</Head>
			<div className="App">
				<Menu className="Menu" />
				<Component {...pageProps} className="Main" />
			</div>
		</>
	);
}

export default MyApp;
