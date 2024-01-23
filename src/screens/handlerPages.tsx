import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { LoginPage } from "./public";
import { ROUTES_PAGES, Layout } from "./private";
import { ProtectedPage } from "@components/index";
import { ThemeProvider, AuthProvider } from "@providers/index";

const HandlerPages: React.FC = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			children: ROUTES_PAGES,
			element: <ProtectedPage element={Layout} validadePage={true} />,
		},
		{
			path: "/login",
			element: <ProtectedPage element={LoginPage} validadePage={false} />,
		},
	]);

	return (
		<AuthProvider>
			<ThemeProvider>
				<RouterProvider router={router} />
			</ThemeProvider>
		</AuthProvider>
	);
};

export default HandlerPages;
