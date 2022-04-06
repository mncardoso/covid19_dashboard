import { Link, Routes, Route } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { IcoLogo } from "./svg/IcoLogo.js";
import { IcoInfo } from "./svg/IcoInfo.js";
import { IcoHome } from "./svg/IcoHome.js";
import { Home } from "./components/Home";
import { Info } from "./components/Info";
import { Loading } from "./components/Loading";
import { GetData } from "./components/GetData";

// css builder
const useStyles = createUseStyles((theme) => ({
	"@global *": {
		boxSizing: "border-box",
		margin: "0",
		padding: "0",
		fontSize: theme.settings.fontSize,
	},

	"@global html": {
		scrollBehavior: "smooth",
	},

	"@global body": {
		height: "100vh",
		overflow: "hidden",
		color: theme.palette.text,
	},

	"@global h1": {
		fontFamily: "'Montserrat', sans-serif",
		fontSize: "2rem",
		fontWeight: theme.fontWeight.Bold,
		textDecoration: "none",
		margin: "none",
	},

	"@global h2": {
		fontFamily: "'Montserrat', sans-serif",
		fontSize: "1rem",
		fontWeight: theme.fontWeight.Bold,
		textDecoration: "none",
		margin: "none",
	},

	"@global h3": {
		fontFamily: "'Montserrat', sans-serif",
		fontSize: "1.5rem",
		fontWeight: theme.fontWeight.Bold,
		textDecoration: "none",
		margin: "none",
	},

	"@global p": {
		fontFamily: "'Montserrat', sans-serif",
		fontSize: "0.75rem",
		fontWeight: theme.fontWeight.Medium,
		textDecoration: "none",
		margin: "none",
	},

	a: {
		fontFamily: "'Montserrat', sans-serif",
		fontSize: "0.75rem",
		fontWeight: theme.fontWeight.Medium,
		textDecoration: "none",
		margin: "none",
		"&:link": { color: theme.palette.text },
		"&:visited": { color: theme.palette.text },
		"&:hover": {
			color: theme.palette.text,
			textDecoration: "underline",
		},
		"&:active": {
			color: theme.palette.text,
			textDecoration: "underline",
		},
	},
	"@global span": {
		textDecoration: "none",
	},
	App: {
		textAlign: "center",
		backgroundColor: theme.palette.background,
		minHeight: window.innerHeight,
		display: "grid",
		gridTemplateColumns: "96px 1fr",
		alignItems: "center",
		justifyContent: "center",
		color: theme.palette.text,
	},
	Menu: {
		display: "grid",
		gridColumn: "1",
		gridTemplateRows: "79px 1fr",
		gap: "1rem",
		height: "100vh",
		padding: "1.5rem 2rem 1.5rem 2rem",
		background: theme.palette.foreground,
		"& nav": {
			height: "100%",
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
		},
		"& ul": {
			listStyleType: "none",
			display: "flex",
			flexDirection: "column",
			gap: "1rem",
		},
	},
	Main: {
		gridColumn: "2",
	},
	AppLink: {
		color: theme.palette.text,
	},
}));

function App(props) {
	const classes = useStyles(props);

	let data = GetData();

	return data ? (
		<div className={classes.App}>
			<menu className={classes.Menu}>
				<IcoLogo />
				<nav>
					<ul>
						<li>
							<Link to="/">
								<IcoHome />
							</Link>
						</li>
					</ul>
					<ul>
						<li className={classes.Info}>
							<Link to="/info">
								<IcoInfo />
							</Link>
						</li>
					</ul>
				</nav>
			</menu>
			<div className={classes.Main}>
				<Routes>
					<Route path="/" element={<Home data={data} />}></Route>
					{/* <Route path="/" element={<Loading />}></Route> */}
					<Route path="/info" element={<Info />}></Route>
				</Routes>
			</div>
		</div>
	) : (
		<div className={classes.App}>
			<menu className={classes.Menu}>
				<IcoLogo />
				<nav>
					<ul>
						<li>
							<Link to="/">
								<IcoHome />
							</Link>
						</li>
					</ul>
					<ul>
						<li className={classes.Info}>
							<Link to="/info">
								<IcoInfo />
							</Link>
						</li>
					</ul>
				</nav>
			</menu>
			<div className={classes.Main}>
				<Routes>
					<Route path="/" element={<Loading />}></Route>
					<Route path="/info" element={<Info />}></Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
