import Link from "next/link";
import Styles from "../../styles/interface/Menu.module.css";
import { IcoHome, IcoInfo, IcoLogo } from "../svg/Icon";

export let Menu = () => {
	return (
		<menu className={Styles.menu}>
			<IcoLogo />
			<nav>
				<ul>
					<li>
						<Link href="/" passHref replace>
							<a className={Styles.go_home}>
								<IcoHome />
							</a>
						</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link href="/info" passHref replace>
							<a className={Styles.go_info}>
								<IcoInfo />
							</a>
						</Link>
					</li>
				</ul>
			</nav>
		</menu>
	);
};
