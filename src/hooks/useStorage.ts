import React from "react";
import { StorageContext } from "../providers/Storage";

export const useStorage = (explode = true) => {
	const ctx = React.useContext(StorageContext);
	if (!ctx && explode) {
		throw new Error("Error, StorageContext not wrapped!");
	}
	return ctx;
};
