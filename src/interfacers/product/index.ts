import { IGetOneRequest } from "./request/IGetOne";
import { IFilteredParams, IGetAllRequest } from "./request/IGetAll";
import { ICreateRequest } from "./request/ICreate";
import { IDataUpdateRequest, IUpdateRequest } from "./request/IUpdate";
import { IDeleteRequest } from "./request/IDelete";
import { ICreateResponse } from "./response/ICreate";
import { IGetOneResponse } from "./response/IGetOne";
import { IGetAllResponse } from "./response/IGetAll";
import { IUpdateResponse } from "./response/IUpdate";
import { IDeleteResponse } from "./response/IDelete";

export type TYPE_QUANTITY = "KG" | "UNI" | "LTS" | "LOTES";

export interface IProduct {
	id: string;
	name: string;
	brand: string;
	storage: string;
	quantity: string;
	type_of_product: string;
	typeOfQuantity: TYPE_QUANTITY;
	created_at: Date;
	update_at: Date;
}

export type {
	ICreateRequest,
	IUpdateRequest,
	IGetOneRequest,
	IGetAllRequest,
	IDeleteRequest,
	IUpdateResponse,
	IGetAllResponse,
	IGetOneResponse,
	ICreateResponse,
	IDeleteResponse,
	IFilteredParams,
	IDataUpdateRequest,
};
