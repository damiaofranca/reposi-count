import { ILoginRequest } from "../../interfacers/auth/ILogin";

export interface IUser {
	email: string;
	profile_data_type: string;
}

export interface IAuthContext {
	profile_data?: IUser;

	onSignOut: () => void;
	onRemoveCurrentUser: () => void;
	onDeleteAccount: () => Promise<void>;
	onSetCurrentUser: (profile_data: IUser) => void;
	onSignIn: (values: ILoginRequest) => Promise<void>;
}
