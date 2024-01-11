import { ILoginRequest, IRegisterRequest } from "../../interfacers/auth/ILogin";

export interface IUser {
	email: string;
	user_type: string;
}

export interface IAuthContext {
	user?: IUser;

	onSignOut: () => void;
	onRemoveCurrentUser: () => void;
	onDeleteAccount: () => Promise<void>;
	onSetCurrentUser: (user: IUser) => void;
	onSignIn: (values: ILoginRequest) => Promise<void>;
	onSignUp: (values: IRegisterRequest) => Promise<void>;
}
