import { IProduct } from "../index";

export interface IDataUpdateRequest
	extends Partial<Omit<IProduct, "id" | "created_at" | "update_at">> {}

export interface IUpdateRequest {
	id: string;
	data: IDataUpdateRequest;
}
