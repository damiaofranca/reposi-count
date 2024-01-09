import { IBrand } from "..";

export interface IDeleteGuestRequest extends Pick<IBrand, "id"> {
	guest: string;
}
