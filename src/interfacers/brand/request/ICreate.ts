import { IBrand } from "./../index";

export interface ICreateRequest
	extends Omit<
		IBrand,
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
