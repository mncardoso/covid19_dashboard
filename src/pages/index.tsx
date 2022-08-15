import styles from "@/styles/index.module.css";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
	const { data, isLoading } = trpc.useQuery(["owid.countries"]);
	if (!isLoading) {
		return (
			<>
				<Head>
					<title>Covid Dashboard</title>
				</Head>
				<main className={styles.main}>
					<h1>Covid Dashboard</h1>
					<ul>
						{Object.keys(data).map((iso) => {
							if (data[iso].continent === "Other") {
								return (
									<li key={iso}>
										<Link href={`/[iso]`} as={`/${iso}`}>
											<a className={styles.button}>{data[iso].location}</a>
										</Link>
									</li>
								);
							}
						})}
					</ul>
					<div>
						<h2>Africa</h2>
						<ul>
							{Object.keys(data).map((iso) => {
								if (data[iso].continent === "Africa") {
									return (
										<li key={iso}>
											<Link href={`/[iso]`} as={`/${iso}`}>
												<a className={styles.button}>{data[iso].location}</a>
											</Link>
										</li>
									);
								}
							})}
						</ul>
					</div>
					<div>
						<h2>Asia</h2>
						<ul>
							{Object.keys(data).map((iso) => {
								if (data[iso].continent === "Asia") {
									return (
										<li key={iso}>
											<Link href={`/[iso]`} as={`/${iso}`}>
												<a className={styles.button}>{data[iso].location}</a>
											</Link>
										</li>
									);
								}
							})}
						</ul>
					</div>
					<div>
						<h2>Europe</h2>
						<ul>
							{Object.keys(data).map((iso) => {
								if (data[iso].continent === "Europe") {
									return (
										<li key={iso}>
											<Link href={`/[iso]`} as={`/${iso}`}>
												<a className={styles.button}>{data[iso].location}</a>
											</Link>
										</li>
									);
								}
							})}
						</ul>
					</div>
					<div>
						<h2>North America</h2>
						<ul>
							{Object.keys(data).map((iso) => {
								if (data[iso].continent === "North America") {
									return (
										<li key={iso}>
											<Link href={`/[iso]`} as={`/${iso}`}>
												<a className={styles.button}>{data[iso].location}</a>
											</Link>
										</li>
									);
								}
							})}
						</ul>
					</div>
					<div>
						<h2>Oceania</h2>
						<ul>
							{Object.keys(data).map((iso) => {
								if (data[iso].continent === "Oceania") {
									return (
										<li key={iso}>
											<Link href={`/[iso]`} as={`/${iso}`}>
												<a className={styles.button}>{data[iso].location}</a>
											</Link>
										</li>
									);
								}
							})}
						</ul>
					</div>
					<div>
						<h2>South America</h2>
						<ul>
							{Object.keys(data).map((iso) => {
								if (data[iso].continent === "South America") {
									return (
										<li key={iso}>
											<Link href={`/[iso]`} as={`/${iso}`}>
												<a className={styles.button}>{data[iso].location}</a>
											</Link>
										</li>
									);
								}
							})}
						</ul>
					</div>
				</main>
			</>
		);
	}
	return <>Loading...</>;
};

export default Home;
