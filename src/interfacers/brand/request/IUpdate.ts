import { IBrand } from "../index";

export interface IDataUpdateRequest
	extends Omit<
		IBrand,
		"id" | "link_detail" | "coordinate" | "createdAt" | "updateAt"
	> {
	coordinate: string;
}

export interface IUpdateRequest {
	id: string;
	data: IDataUpdateRequest;
}
