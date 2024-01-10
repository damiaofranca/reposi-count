/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, createContext } from "react";

import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { IAuthContext } from "./types";
import {
	ILoginRequest,
	ILoginResponse,
	IRegisterRequest,
} from "../../interfacers/auth/ILogin";
import api from "../../api";
import { decodeHash, encryptToken, removeToken } from "../../utils/script";

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const user = decodeHash();

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

	const onSignUp = async (values: IRegisterRequest) => {
		try {
			await api.post("/users/signup", values);
			toast.success("Usuário cadastrado com sucesso.", {
				autoClose: 1000,
			});
		} catch (err) {
			console.log(err);
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
				user: user
					? {
							email: user.email,
							user_type: user.user_type,
					  }
					: undefined,
				onSignIn,
				onSignUp,
				onSignOut,
				onDeleteAccount,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
