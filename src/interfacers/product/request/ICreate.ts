import { IProduct } from "./../index";

export interface ICreateRequest
	extends Omit<IProduct, "id" | "created_at" | "update_at"> {}
