import { IStorage } from "./../index";

export interface ICreateRequest
	extends Omit<IStorage, "id" | "created_at" | "update_at"> {}
