import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "normalize.css/normalize.css";
import { ThemeProvider } from "react-jss";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
);
