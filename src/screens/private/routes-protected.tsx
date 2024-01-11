import { RouteObject } from "react-router-dom";
import { ProtectedPage } from "../../components";

import { Brands } from "./Brands";
import { Account } from "./Account";
import { Storages } from "./Storage";
import { InitialPage } from "./InitialPage";
import { DeleteAccount } from "./DeleteAccount";

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
		element: <ProtectedPage element={Storages} validadePage={true} />,
	},
	{
		path: "/account",
		element: <ProtectedPage element={Account} validadePage={true} />,
		children: [
			{
				path: "delete-account",
				element: <DeleteAccount />,
			},
		],
	},
];
