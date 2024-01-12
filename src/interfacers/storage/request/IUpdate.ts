import { IStorage } from "../index";

export interface IDataUpdateRequest
	extends Partial<Omit<IStorage, "id" | "created_at" | "update_at">> {}

export interface IUpdateRequest {
	id: string;
	data: IDataUpdateRequest;
}
