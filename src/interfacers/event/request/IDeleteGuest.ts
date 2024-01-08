import { IEvent } from "..";

export interface IDeleteGuestRequest extends Pick<IEvent, "id"> {
	guest: string;
}
