import { SEO } from "@/components/SEO";
import "@/styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<>
			<SEO />
			<Component {...pageProps} />
		</>
	);
};

export default MyApp;
