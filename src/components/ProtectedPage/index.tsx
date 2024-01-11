import React, { useEffect } from "react";
import { fromUnixTime, isAfter } from "date-fns";
import { Navigate, Outlet } from "react-router-dom";
import { decodeHash, removeToken } from "../../utils/script";
import { useAuth } from "../../hooks";

export type IProtectedPageProps = {
	redirectTo?: string;
	validadePage?: boolean;
	element?: React.FunctionComponent;
	elementProps?: Record<string, unknown>;
};

export const ProtectedPage: React.FC<IProtectedPageProps> = ({
	elementProps,
	element: Element,
	validadePage = true,
	redirectTo = "/login",
}) => {
	const user = decodeHash();
	const { user: _user, onSetCurrentUser, onRemoveCurrentUser } = useAuth();

	useEffect(() => {
		if (!_user && user) {
			onSetCurrentUser(user);
		}
	}, [user]);

	if (validadePage) {
		if (!user) {
			removeToken();
			onRemoveCurrentUser();
			return <Navigate to={redirectTo} />;
		}

		if (isAfter(new Date(), fromUnixTime(user.exp))) {
			removeToken();
			onRemoveCurrentUser();
			return <Navigate to={redirectTo} />;
		}
	}

	if (Element) {
		return <Element {...(elementProps || {})} />;
	}

	return <Outlet />;
};
