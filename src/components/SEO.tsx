import { MetaData } from "@/data/metadata";
import Head from "next/head";

export const SEO = () => {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>{MetaData.title}</title>
				<meta name="robots" content={MetaData.robots} />
				<meta name="description" content={MetaData.description} />
				<meta name="keywords" content={MetaData.keywords} />
				<meta name="author" content={MetaData.author} />

				{/* Open Graph */}
				<meta property="og:type" content={MetaData.type} />
				<meta property="og:title" content={MetaData.title} />
				<meta property="og:site_name" content={MetaData.site_name} />
				<meta property="og:description" content={MetaData.description} />
				<meta property="og:url" content={MetaData.url} />
				<meta property="og:image" content={MetaData.image} />

				{/* Twitter */}
				<meta name="twitter:title" content={MetaData.title} />
				<meta name="twitter:description" content={MetaData.description} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:image" content={MetaData.image} />
				<meta name="twitter:site" content={MetaData.twitter} />

				{/* App */}
				<meta name="apple-mobile-web-app-title" content={MetaData.title} />
				<meta name="application-name" content={MetaData.title} />

				{/* Favicons */}
				<link
					rel="icon"
					type="image/x-icon"
					sizes="any"
					href="../favicon.ico"
				/>
				<link rel="icon" type="image/svg+xml" href="../favicon.svg" />

				{/* Apple Icons */}
				<link rel="apple-touch-icon" href="../apple-touch-icon.png" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href={MetaData.apple_180}
				/>
				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href={MetaData.apple_152}
				/>
				<link
					rel="apple-touch-icon"
					sizes="144x144"
					href={MetaData.apple_144}
				/>
				<link
					rel="apple-touch-icon"
					sizes="120x120"
					href={MetaData.apple_120}
				/>
				<link
					rel="apple-touch-icon"
					sizes="114x114"
					href={MetaData.apple_114}
				/>
				<link rel="apple-touch-icon" sizes="76x76" href={MetaData.apple_76} />
				<link rel="apple-touch-icon" sizes="72x72" href={MetaData.apple_72} />
				<link rel="apple-touch-icon" sizes="60x60" href={MetaData.apple_60} />
				<link rel="apple-touch-icon" sizes="57x57" href={MetaData.apple_57} />
				<link
					rel="mask-icon"
					href={MetaData.safari_pinned}
					color={MetaData.theme}
				/>

				{/* Chrome Icons */}
				<link
					rel="icon"
					type="image/png"
					sizes="512x512"
					href={MetaData.android_512}
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="384x384"
					href={MetaData.android_384}
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="256x256"
					href={MetaData.android_256}
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="192x192"
					href={MetaData.android_192}
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="114x114"
					href={MetaData.android_114}
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="96x96"
					href={MetaData.android_96}
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="72x72"
					href={MetaData.android_72}
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="48x48"
					href={MetaData.android_48}
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="36x36"
					href={MetaData.android_36}
				/>

				{/* Microsoft */}
				<meta name="msapplication-TileColor" content={MetaData.theme} />
				<meta name="msapplication-TileImage" content={MetaData.mstile_144} />

				{/* Theme Color */}
				<meta name="theme-color" content={MetaData.theme} />
				<link rel="manifest" href="../manifest.json" />
			</Head>
		</>
	);
};
