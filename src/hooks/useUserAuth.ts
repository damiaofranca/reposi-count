import React from "react";
import { UserAuthContext } from "../providers/UserAuth";

export const useUserAuth = (explode = true) => {
	const ctx = React.useContext(UserAuthContext);
	if (!ctx && explode) {
		throw new Error("Error, context not wrapped!");
	}
	return ctx;
};
