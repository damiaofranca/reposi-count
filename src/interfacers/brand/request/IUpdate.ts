import { IBrand } from "../index";

export interface IDataUpdateRequest
	extends Omit<IBrand, "id" | "link_detail" | "createdAt" | "updateAt"> {}

export interface IUpdateRequest {
	id: string;
	data: IDataUpdateRequest;
}
