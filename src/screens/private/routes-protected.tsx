import { RouteObject } from "react-router-dom";

import { ProtectedPage } from "@components/index";
import { Brands, Storages, InitialPage, StoreDetail } from "./index";
import { StorageProvider, StorageDetailProvider } from "@providers/index";

export const ROUTES_PAGES: RouteObject[] = [
	{
		path: "/",
		element: <ProtectedPage element={InitialPage} validadePage={true} />,
	},
	{
		path: "/brands",
		element: <ProtectedPage element={Brands} validadePage={true} />,
	},
	{
		path: "/storages",
		element: (
			<ProtectedPage
				element={() => (
					<StorageProvider>
						<Storages />
					</StorageProvider>
				)}
				validadePage={true}
			/>
		),
	},
	{
		path: "/storages/:id",
		element: (
			<ProtectedPage
				element={() => (
					<StorageDetailProvider>
						<StoreDetail />
					</StorageDetailProvider>
				)}
				validadePage={true}
			/>
		),
	},
];
