import styles from "@/styles/index.module.css";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
	return <h1 className={styles.mid}>Welcome, please select a country</h1>;
};

export default Home;
