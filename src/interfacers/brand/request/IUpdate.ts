import { IBrand } from "../index";

export interface IDataUpdateRequest
	extends Omit<IBrand, "id" | "createdAt" | "updateAt"> {}

export interface IUpdateRequest {
	id: string;
	data: IDataUpdateRequest;
}
