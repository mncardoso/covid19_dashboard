import styles from "@/layout/styles/MenuBar.module.css";
import { trpc } from "@/utils/trpc";
import React from "react";
import { DropDown } from "./DropDown";

export const MenuBar = () => {
	const { data, isLoading } = trpc.useQuery(["owid.countries"]);
	const [menuState, setMenuState] = React.useState(false);
	const onClick = () => {
		setMenuState(!menuState);
	};
	let style = !menuState ? styles.subMenuClose : styles.subMenuOpen;
	if (!isLoading) {
		return (
			<div className={styles.menuBar}>
				<div className={styles.button} onClick={onClick}>
					<svg height="18px" width="18px" viewBox="0 0 32 32" fill="#fff">
						<path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
					</svg>
				</div>
				<div className={style}>
					<DropDown continent={"Africa"} data={data} />
					<DropDown continent={"Asia"} data={data} />
					<DropDown continent={"Europe"} data={data} />
					<DropDown continent={"North America"} data={data} />
					<DropDown continent={"Oceania"} data={data} />
					<DropDown continent={"South America"} data={data} />
				</div>
			</div>
		);
	}
	return <div />;
};
