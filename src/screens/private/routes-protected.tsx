import { RouteObject } from "react-router-dom";
import { ProtectedPage } from "../../components";

import { Brands } from "./Brands";
import { Account } from "./Account";
import { InitialPage } from "./InitialPage";
import { DeleteAccount } from "./DeleteAccount";
import { PartnersStores } from "./PartnersStores";

export const ROUTES_PAGES: RouteObject[] = [
	{
		path: "/",
		element: <ProtectedPage element={InitialPage} validatePage={true} />,
	},
	{
		path: "/partners",
		element: <ProtectedPage element={PartnersStores} validatePage={true} />,
	},
	{
		path: "/brands",
		element: <ProtectedPage element={Brands} validatePage={true} />,
	},
	{
		path: "/account",
		element: <ProtectedPage element={Account} validatePage={true} />,
		children: [
			{
				path: "delete-account",
				element: <DeleteAccount />,
			},
		],
	},
];
