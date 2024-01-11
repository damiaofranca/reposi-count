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

export interface IStorage {
	id: string;
	uf: string;
	cep: string;
	city: string;
	street: string;
	district: string;
	identifier: string;
	localNumber: string;
	createdAt: Date;
	updateAt: Date;
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
