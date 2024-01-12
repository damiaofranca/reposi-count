/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, createContext, useState } from "react";

import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { IAuthContext, IUser } from "./types";
import { ILoginRequest, ILoginResponse } from "../../interfacers/auth/ILogin";
import api from "../../api";
import { encryptToken, removeToken } from "../../utils/script";

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [profile_data, setUser] = useState<IUser | null>(null);

	const onSetCurrentUser = (_profile_data: IUser) => {
		setUser(_profile_data);
	};
	const onRemoveCurrentUser = () => {
		setUser(null);
	};

	const onSignIn = async (values: ILoginRequest) => {
		try {
			const { data } = await api.post<ILoginResponse>("/auth/signin", values);
			await encryptToken(data.access_token);
		} catch (err) {
			if (err instanceof AxiosError) {
				if (err.request.response) {
					if (
						err.response?.status &&
						(err.response?.status === 400 || err.response?.status === 404)
					) {
						toast.error("Senha ou email errado.");
					}
				}
			}
		}
	};

	const onDeleteAccount = async () => {};

	const onSignOut = () => {
		removeToken();
		document.location.reload();
	};

	return (
		<AuthContext.Provider
			value={{
				profile_data: profile_data
					? {
							email: profile_data.email,
							profile_data_type: profile_data.profile_data_type,
					  }
					: undefined,
				onSignIn,
				onSignOut,
				onDeleteAccount,
				onSetCurrentUser,
				onRemoveCurrentUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
