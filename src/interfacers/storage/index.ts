import { IGetOneRequest } from "./request/IGetOne";
import { ICreateRequest } from "./request/ICreate";
import { IDeleteRequest } from "./request/IDelete";
import { ICreateResponse } from "./response/ICreate";
import { IGetOneResponse } from "./response/IGetOne";
import { IGetAllResponse } from "./response/IGetAll";
import { IUpdateResponse } from "./response/IUpdate";
import { IDeleteResponse } from "./response/IDelete";
import { IDashboardRequest } from "./request/IDashboard";
import { IDashboardResponse } from "./response/IDashboard";
import { IFilteredParams, IGetAllRequest } from "./request/IGetAll";
import { IDataUpdateRequest, IUpdateRequest } from "./request/IUpdate";
import { ITransitionResponse } from "./response/ITransitions";

export interface IStorage {
	id: string;
	uf: string;
	cep: string;
	city: string;
	street: string;
	district: string;
	identifier: string;
	local_number: string;
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
	IDashboardRequest,
	IDataUpdateRequest,
	IDashboardResponse,
	ITransitionResponse,
};
