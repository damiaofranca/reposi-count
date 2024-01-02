import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./private/Layout";
import LoginPage from "./public/LoginPage";
import { ProtectedPage } from "../components";
import { UserAuth } from "../providers/UserAuth";
import RegisterPage from "./public/RegisterPage";
import ForgotPassword from "./public/ForgotPassword";
import { ROUTES_PAGES } from "./private/routes-protected";
import { ThemeProvider } from "../providers/Theme";

const HandlerPages: React.FC = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			children: ROUTES_PAGES,
			element: <ProtectedPage element={Layout} validatePage={true} />,
		},
		{
			path: "/login",
			element: <ProtectedPage element={LoginPage} validatePage={false} />,
		},
		{
			path: "/register",
			element: <ProtectedPage element={RegisterPage} validatePage={false} />,
		},
		{
			path: "/forgot-password",
			element: <ProtectedPage element={ForgotPassword} validatePage={false} />,
		},
	]);

	return (
		<UserAuth>
			<RouterProvider router={router} />
		</UserAuth>
	);
};

export default HandlerPages;
