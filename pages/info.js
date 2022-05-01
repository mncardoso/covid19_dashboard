import Head from "next/head";
import styles from "../styles/Info.module.css";

let Info = () => {
	return (
		<div>
			<Head>
				<title>Covid Dashboard | Info</title>
			</Head>
			<div className={styles.main}>
				<h1>Info</h1>
				<p>I&apos;ll be updating this soon(tm)</p>
			</div>
		</div>
	);
};

export default Info;
