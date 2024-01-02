import React from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { dbFireStore } from "../config/firebase";

export interface Store {
	city: string;
	lat: number;
	lng: number;
	name: string;
	totalMount: string;
}

interface IUseGetStores {
	stores: Store[];
	topEightCities: Store[] | null;
}

export const useGetStores = (): IUseGetStores => {
	const [stores, setStores] = React.useState<Store[]>([]);

	const topEightCities = React.useMemo(() => {
		return stores
			? stores.sort((a, b) => Number(a.totalMount) - Number(b.totalMount))
			: null;
	}, [stores]);

	React.useEffect(() => {
		const unsub = onSnapshot(
			query(collection(dbFireStore, "stores")),
			(collection) => {
				!collection.empty &&
					setStores(() =>
						collection.docs.map((store) => store.data() as Store),
					);
			},
		);

		return () => unsub();
	}, []);

	return {
		stores,
		topEightCities,
	};
};
