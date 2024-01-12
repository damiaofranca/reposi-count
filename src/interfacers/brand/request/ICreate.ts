import { IBrand } from "./../index";

export interface ICreateRequest
	extends Omit<IBrand, "id" | "created_at" | "update_at"> {}
