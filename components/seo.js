import Head from "next/head";
import { Meta } from "../data/meta";

export let SEO = () => {
	return (
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>{Meta.title}</title>
			<meta name="robots" content={Meta.robots} />
			<meta name="description" content={Meta.description} />
			<meta name="keywords" content={Meta.keywords} />
			<meta name="author" content={Meta.author} />

			{/* Open Graph */}
			<meta property="og:type" content={Meta.type} />
			<meta property="og:title" content={Meta.title} />
			<meta property="og:site_name" content={Meta.site_name} />
			<meta property="og:description" content={Meta.description} />
			<meta property="og:url" content={Meta.url} />
			<meta property="og:image" content={Meta.image} />

			{/* Twitter */}
			<meta name="twitter:title" content={Meta.title} />
			<meta name="twitter:description" content={Meta.description} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:image" content={Meta.image} />
			<meta name="twitter:site" content={Meta.twitter} />

			{/* App */}
			<meta name="apple-mobile-web-app-title" content={Meta.title} />
			<meta name="application-name" content={Meta.title} />

			{/* Favicons */}
			<link rel="icon" type="image/x-icon" sizes="any" href="../favicon.ico" />
			<link rel="icon" type="image/svg+xml" href="../favicon.svg" />

			{/* Apple Icons */}
			<link rel="apple-touch-icon" href="../apple-touch-icon.png" />
			<link rel="apple-touch-icon" sizes="180x180" href={Meta.apple_180} />
			<link rel="apple-touch-icon" sizes="152x152" href={Meta.apple_152} />
			<link rel="apple-touch-icon" sizes="144x144" href={Meta.apple_144} />
			<link rel="apple-touch-icon" sizes="120x120" href={Meta.apple_120} />
			<link rel="apple-touch-icon" sizes="114x114" href={Meta.apple_114} />
			<link rel="apple-touch-icon" sizes="76x76" href={Meta.apple_76} />
			<link rel="apple-touch-icon" sizes="72x72" href={Meta.apple_72} />
			<link rel="apple-touch-icon" sizes="60x60" href={Meta.apple_60} />
			<link rel="apple-touch-icon" sizes="57x57" href={Meta.apple_57} />
			<link rel="mask-icon" href={Meta.safari_pinned} color={Meta.theme} />

			{/* Chrome Icons */}
			<link
				rel="icon"
				type="image/png"
				sizes="512x512"
				href={Meta.android_512}
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="384x384"
				href={Meta.android_384}
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="256x256"
				href={Meta.android_256}
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="192x192"
				href={Meta.android_192}
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="114x114"
				href={Meta.android_114}
			/>
			<link rel="icon" type="image/png" sizes="96x96" href={Meta.android_96} />
			<link rel="icon" type="image/png" sizes="72x72" href={Meta.android_72} />
			<link rel="icon" type="image/png" sizes="48x48" href={Meta.android_48} />
			<link rel="icon" type="image/png" sizes="36x36" href={Meta.android_36} />

			{/* Microsoft */}
			<meta name="msapplication-TileColor" content={Meta.theme} />
			<meta name="msapplication-TileImage" content={Meta.mstile_144} />

			{/* Theme Color */}
			<meta name="theme-color" content={Meta.theme} />

			<link rel="manifest" href="../manifest.json" />
		</Head>
	);
};
