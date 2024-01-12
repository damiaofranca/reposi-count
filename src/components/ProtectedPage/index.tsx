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
	const profile_data = decodeHash();
	const {
		profile_data: _profile_data,
		onSetCurrentUser,
		onRemoveCurrentUser,
	} = useAuth();

	useEffect(() => {
		if (!_profile_data && profile_data) {
			onSetCurrentUser(profile_data);
		}
	}, [profile_data]);

	if (validadePage) {
		if (!profile_data) {
			removeToken();
			onRemoveCurrentUser();
			return <Navigate to={redirectTo} />;
		}

		if (isAfter(new Date(), fromUnixTime(profile_data.exp))) {
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
