import { IGetOneRequest } from "./request/IGetOne";
import { IGetAllNoPaginationRequest, IGetAllRequest } from "./request/IGetAll";
import { ICreateRequest } from "./request/ICreate";
import { IDataUpdateRequest, IUpdateRequest } from "./request/IUpdate";
import { IDeleteRequest } from "./request/IDelete";
import { ICreateResponse } from "./response/ICreate";
import { IGetOneResponse } from "./response/IGetOne";
import {
	IGetAllNoPaginationResponse,
	IGetAllResponse,
} from "./response/IGetAll";
import { IUpdateResponse } from "./response/IUpdate";
import { IDeleteResponse } from "./response/IDelete";

export interface IBrand {
	id: string;
	name: string;
	cnpj: string;
	created_at: string;
	update_at: string;
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
	IDataUpdateRequest,
	IGetAllNoPaginationRequest,
	IGetAllNoPaginationResponse,
};
