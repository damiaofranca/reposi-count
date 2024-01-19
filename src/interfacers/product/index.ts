import { IGetOneRequest } from "./request/IGetOne";
import { ICreateRequest } from "./request/ICreate";
import { IDeleteRequest } from "./request/IDelete";
import { ICreateResponse } from "./response/ICreate";
import { IGetOneResponse } from "./response/IGetOne";
import { IGetAllResponse } from "./response/IGetAll";
import { IUpdateResponse } from "./response/IUpdate";
import { IDeleteResponse } from "./response/IDelete";
import { ITransferRequest } from "./request/ITransfer";
import { ITransferResponse } from "./response/ITransfer";
import { IFilteredParams, IGetAllRequest } from "./request/IGetAll";
import { IDataUpdateRequest, IUpdateRequest } from "./request/IUpdate";

export type TYPE_QUANTITY = "KG" | "UNI" | "LTS" | "LOTES";

export interface IProduct {
	id: string;
	name: string;
	brand: string;
	storage: string;
	quantity: string;
	type_of_product: string;
	type_of_quantity: TYPE_QUANTITY;
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
	ITransferRequest,
	ITransferResponse,
	IDataUpdateRequest,
};
