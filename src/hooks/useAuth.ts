import React from "react";
import { AuthContext } from "../providers/Auth";

export const useAuth = (explode = true) => {
	const ctx = React.useContext(AuthContext);
	if (!ctx && explode) {
		throw new Error("Error, context not wrapped!");
	}
	return ctx;
};
