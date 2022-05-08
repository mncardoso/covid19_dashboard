import { max, scaleLinear } from "d3";
import styles from "../../styles/graphql/Vaccinations.module.css";

export let Vaccinations = ({ data, width, isoCode }) => {
	let isoData = data[isoCode]["data"];
	let population = data[isoCode]["population"];
	let dataVax1 = isoData.map((d) =>
		!d["people_vaccinated"] ? 0 : d["people_vaccinated"]
	);
	let dataVax2 = isoData.map((d) =>
		!d["people_fully_vaccinated"] ? 0 : d["people_fully_vaccinated"]
	);
	let dataVax3 = isoData.map((d) =>
		!d["total_boosters"] ? 0 : d["total_boosters"]
	);

	let percentage = scaleLinear().domain([0, population]).range([0, 100]);

	let vaccinationNum = {
		zero: population - max(dataVax1),
		one: max(dataVax1) - max(dataVax2),
		two: max(dataVax2) - max(dataVax3),
		three: max(dataVax3),
	};

	let vaccinationWidth = {
		zero: `${percentage(vaccinationNum.zero) / 100}%`,
		one: `${percentage(vaccinationNum.one) / 100}%`,
		two: `${percentage(vaccinationNum.two) / 100}%`,
		three: `${percentage(vaccinationNum.three) / 100}%`,
	};

	let barHeight = 16;

	return (
		<div className={styles.data}>
			<div>
				<div className={styles.title}>
					<p>0 Vaccines</p>
					<p>{percentage(vaccinationNum.zero).toFixed(2) + "%"}</p>
				</div>
				<svg width="100%" height={barHeight}>
					<rect
						x="0"
						y="0"
						rx="8px"
						ry="8px"
						width="100%"
						height={barHeight}
						className={styles.red_bg}
					/>
					<rect
						x="0"
						y="0"
						rx="8px"
						ry="8px"
						width={percentage(vaccinationNum.zero).toFixed(2) + "%"}
						height={barHeight}
						className={styles.red_fg}
					/>
				</svg>
			</div>
			<div>
				<div className={styles.title}>
					<p>1 Vaccine</p>
					<p>{percentage(vaccinationNum.one).toFixed(2) + "%"}</p>
				</div>
				<svg width="100%" height={barHeight}>
					<rect
						x="0"
						y="0"
						rx="8px"
						ry="8px"
						width="100%"
						height={barHeight}
						className={styles.blue_bg}
					/>
					<rect
						x="0"
						y="0"
						rx="8px"
						ry="8px"
						width={percentage(vaccinationNum.one).toFixed(2) + "%"}
						height={barHeight}
						className={styles.blue_fg}
					/>
				</svg>
			</div>
			<div>
				<div className={styles.title}>
					<p>2 Vaccines</p>
					<p>{percentage(vaccinationNum.two).toFixed(2) + "%"}</p>
				</div>
				<svg width="100%" height={barHeight}>
					<rect
						x="0"
						y="0"
						rx="8px"
						ry="8px"
						width="100%"
						height={barHeight}
						className={styles.blue_bg}
					/>
					<rect
						x="0"
						y="0"
						rx="8px"
						ry="8px"
						width={percentage(vaccinationNum.two).toFixed(2) + "%"}
						height={barHeight}
						className={styles.blue_fg}
					/>
				</svg>
			</div>
			<div>
				<div className={styles.title}>
					<p>3 Vaccines</p>
					<p>{percentage(vaccinationNum.three).toFixed(2) + "%"}</p>
				</div>
				<svg width="100%" height={barHeight}>
					<rect
						x="0"
						y="0"
						rx="8px"
						ry="8px"
						width="100%"
						height={barHeight}
						className={styles.blue_bg}
					/>
					<rect
						x="0"
						y="0"
						rx="8px"
						ry="8px"
						width={percentage(vaccinationNum.three).toFixed(2) + "%"}
						height={barHeight}
						className={styles.blue_fg}
					/>
				</svg>
			</div>
		</div>
	);
};
