import { IBrand } from "../index";

export interface IDataUpdateRequest
	extends Omit<IBrand, "id" | "created_at" | "update_at"> {}

export interface IUpdateRequest {
	id: string;
	data: IDataUpdateRequest;
}
