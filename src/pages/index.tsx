import { MenuBar } from "@/layout/MenuBar";
import styles from "@/styles/index.module.css";
import type { InferGetStaticPropsType } from "next";

const Home = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<>
			<MenuBar data={data} />
			<h1 className={styles.mid}>Welcome, please select a country</h1>
		</>
	);
};

export default Home;

export async function getStaticProps() {
	const response = await fetch("https://covid-dashboard.app/api");
	const data = await response.json();
	return { props: { data }, revalidate: 3600 };
}
