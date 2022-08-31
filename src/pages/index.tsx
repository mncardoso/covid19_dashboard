import { MenuBar } from "@/layout/MenuBar";
import styles from "@/styles/index.module.css";
import type { InferGetStaticPropsType } from "next";

const Home = () =>
	// 	{
	// 	data,
	// 	url,
	// }: InferGetStaticPropsType<typeof getStaticProps>
	{
		return (
			<>
				{/* <MenuBar data={data} /> */}
				<h1 className={styles.mid}>Welcome, please select a country</h1>
			</>
		);
	};

export default Home;

const getBaseUrl = () => {
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
	return `http://localhost:${process.env.PORT ?? 3000}`;
};

// export async function getStaticProps() {
// 	const url = `${getBaseUrl()}/api/trpc`;
// 	const response = await fetch(`${getBaseUrl()}/api/owid`);
// 	const data = await response.json();
// 	return { props: { data, url }, revalidate: 3600 };
// }
