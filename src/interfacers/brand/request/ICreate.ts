import { IBrand } from "./../index";

export interface ICreateRequest
	extends Omit<IBrand, "id" | "createdAt" | "updateAt"> {}
