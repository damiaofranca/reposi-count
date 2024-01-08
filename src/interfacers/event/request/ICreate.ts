import { IEvent } from "./../index";

export interface ICreateRequest
	extends Omit<
		IEvent,
		| "id"
		| "user"
		| "guests"
		| "link_detail"
		| "coordinate"
		| "createdAt"
		| "updateAt"
	> {
	coordinate: string;
}
