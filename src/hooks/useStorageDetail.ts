import React from "react";
import { StorageDetailContext } from "../providers/StorageDetail";

export const useStorageDetail = (explode = true) => {
	const ctx = React.useContext(StorageDetailContext);
	if (!ctx && explode) {
		throw new Error("Error, StorageDetailContext not wrapped!");
	}
	return ctx;
};
