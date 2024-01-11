import { IStorage } from "../index";

export interface IDataUpdateRequest
	extends Partial<Omit<IStorage, "id" | "createdAt" | "updateAt">> {}

export interface IUpdateRequest {
	id: string;
	data: IDataUpdateRequest;
}
