import { IRegister } from "../IRegister";

export interface IRegisterRequest
	extends Pick<IRegister, "email" | "nickname"> {
	password: string;
}
