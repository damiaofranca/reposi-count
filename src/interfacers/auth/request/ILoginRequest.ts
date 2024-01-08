import { ILogin } from "../ILogin";

export interface ILoginRequest extends Pick<ILogin, "email"> {
	password: string;
}
