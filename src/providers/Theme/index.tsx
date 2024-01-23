import React, { ReactNode, useState } from "react";

import { IThemeContext } from "./types";
import { injectInitialTheme } from "@utils/injectInitialTheme";

interface UserAuthProps {
	children: ReactNode;
}

export const ThemeContext = React.createContext<IThemeContext>(
	{} as IThemeContext,
);

injectInitialTheme();

export const ThemeProvider: React.FC<UserAuthProps> = ({ children }) => {
	const [theme, setTheme] = useState<"light" | "dark">(
		(localStorage.getItem("theme") as "light" | "dark") || "light",
	);

	const onChangeTheme = () => {
		setTheme((theme) => {
			localStorage.setItem("theme", theme === "light" ? "dark" : "light");
			return theme === "light" ? "dark" : "light";
		});
	};

	return (
		<main className={theme}>
			<ThemeContext.Provider
				value={{
					theme,
					onChangeTheme,
				}}
			>
				{children}
			</ThemeContext.Provider>
		</main>
	);
};
