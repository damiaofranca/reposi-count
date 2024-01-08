import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./private/Layout";
import LoginPage from "./public/LoginPage";
import { ProtectedPage } from "../components";
import { AuthProvider } from "../providers/Auth";
import ForgotPassword from "./public/ForgotPassword";
import { ROUTES_PAGES } from "./private/routes-protected";
import { ThemeProvider } from "../providers/Theme";

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
		{
			path: "/forgot-password",
			element: <ProtectedPage element={ForgotPassword} validadePage={false} />,
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
