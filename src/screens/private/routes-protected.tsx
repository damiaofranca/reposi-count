import { RouteObject } from "react-router-dom";
import { ProtectedPage } from "../../components";

import { InitialPage } from "./InitialPage";
import { PartnersStores } from "./PartnersStores";
import { Account } from "./Account";
import { DeleteAccount } from "./DeleteAccount";

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
