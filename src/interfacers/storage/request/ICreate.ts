import { IStorage } from "./../index";

export interface ICreateRequest
	extends Omit<IStorage, "id" | "createdAt" | "updateAt"> {}
