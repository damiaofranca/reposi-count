import React from "react";
import { ThemeContext } from "../providers/Theme";

export const useTheme = (explode = true) => {
	const ctx = React.useContext(ThemeContext);
	if (!ctx && explode) {
		throw new Error("Error, context not wrapped!");
	}
	return ctx;
};
