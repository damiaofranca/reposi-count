import { ILoginRequest } from "./request/ILoginRequest";
import { ILoginResponse } from "./response/ILoginResponse";
import { IRegisterRequest } from "./request/IRegisterRequest";
import { IRegisterResponse } from "./response/IRegisterResponse";

interface ILogin {
	email: string;
}

export type {
	ILogin,
	ILoginRequest,
	ILoginResponse,
	IRegisterRequest,
	IRegisterResponse,
};
