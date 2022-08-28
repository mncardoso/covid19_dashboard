import styles from "@/layout/styles/DropDown.module.css";
import Link from "next/link";
import {
	JSXElementConstructor,
	ReactElement,
	ReactFragment,
	ReactPortal,
	useState,
} from "react";

export const DropDown = (props: { continent: string; data: any }) => {
	const [menuState, setMenuState] = useState(false);
	return (
		<div
			className={styles.continent}
			onMouseEnter={() => setMenuState(!menuState)}
			onMouseLeave={() => setMenuState(!menuState)}>
			<h3 className={styles.title}>{props.continent}</h3>
			<ul className={menuState ? styles.open : styles.close}>
				{Object.keys(props.data).map((iso) => {
					if (props.data[iso].continent === props.continent) {
						return (
							<li key={iso}>
								<Link href={`/[iso]`} as={`/${iso}`}>
									<a className={styles.button}>{props.data[iso].location}</a>
								</Link>
							</li>
						);
					}
				})}
			</ul>
		</div>
	);
};
