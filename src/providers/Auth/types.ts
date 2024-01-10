import { ILoginRequest, IRegisterRequest } from "../../interfacers/auth/ILogin";

interface IUser {
	email: string;
	user_type: string;
}

export interface IAuthContext {
	user?: IUser;

	onSignOut: () => void;
	onDeleteAccount: () => Promise<void>;
	onSignIn: (values: ILoginRequest) => Promise<void>;
	onSignUp: (values: IRegisterRequest) => Promise<void>;
}
