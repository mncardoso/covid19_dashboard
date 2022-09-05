import { env } from "@/env/client.mjs";

const baseURL = env.NEXT_PUBLIC_ICON_URL;

export const MetaData = {
	title: "Covid-19 Dashboard",
	site_name: "Covid-19 Dashboard",
	description: "A covid dashboard to keep you inform on your desired location.",
	keywords: "Covid-19, Coronavirus, Dashboard, Data-Visualization",
	author: "Miguel Cardoso",
	url: "https://covid-dashboard.app/",
	type: "website",
	robots: "follow, index",
	image: `${baseURL}og_image.png`,
	twitter_card: "summary_large_image",
	twitter: "@mncardoso",
	theme: "#1a1a1a",

	// Faveicons
	fav_icon: `${baseURL}favicon.ico`,
	fav_svg: `${baseURL}favicon.svg`,

	// Safari Pinned Tab
	safari_pinned: `${baseURL}safari_pinned_tab.svg`,

	// Apple Touch Icons
	apple_57: `${baseURL}apple-touch-icon-57x57.png`,
	apple_60: `${baseURL}apple-touch-icon-60x60.png`,
	apple_72: `${baseURL}apple-touch-icon-72x72.png`,
	apple_76: `${baseURL}apple-touch-icon-76x76.png`,
	apple_114: `${baseURL}apple-touch-icon-57x57@2x.png`,
	apple_120: `${baseURL}apple-touch-icon-60x60@2x.png`,
	apple_144: `${baseURL}apple-touch-icon-72x72@2x.png`,
	apple_152: `${baseURL}apple-touch-icon-76x76@2x.png`,
	apple_180: `${baseURL}apple-touch-icon-60x60@3x.png`,

	// Android Icons
	android_36: `${baseURL}android-chrome-36x36.png`,
	android_48: `${baseURL}android-chrome-48x48.png`,
	android_72: `${baseURL}android-chrome-72x72.png`,
	android_96: `${baseURL}android-chrome-96x96.png`,
	android_114: `${baseURL}android-chrome-114x114.png`,
	android_192: `${baseURL}android-chrome-192x192.png`,
	android_256: `${baseURL}android-chrome-256x256.png`,
	android_384: `${baseURL}android-chrome-384x384.png`,
	android_512: `${baseURL}android-chrome-512x512.png`,

	// Windows Icons
	mstile_70: `${baseURL}mstile-70x70.png`,
	mstile_144: `${baseURL}mstile-144x144.png`,
	mstile_150: `${baseURL}mstile-150x150.png`,
	mstile_310: `${baseURL}mstile-310x310.png`,
	mstile_310x150: `${baseURL}mstile-310x150.png`,
};
