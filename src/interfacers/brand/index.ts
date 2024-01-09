import { IGetOneRequest } from "./request/IGetOne";
import { IGetAllRequest } from "./request/IGetAll";
import { ICreateRequest } from "./request/ICreate";
import { IDataUpdateRequest, IUpdateRequest } from "./request/IUpdate";
import { IDeleteRequest } from "./request/IDelete";
import { ICreateResponse } from "./response/ICreate";
import { IGetOneResponse } from "./response/IGetOne";
import { IGetAllResponse } from "./response/IGetAll";
import { IDeleteGuestRequest } from "./request/IDeleteGuest";
import { IDeleteGuestResponse } from "./response/IDeleteGuest";
import { IUpdateResponse } from "./response/IUpdate";
import { IDeleteResponse } from "./response/IDelete";

export interface IBrand {
	id: string;
	brand: string;
	password: string;
	link_detail: string;
	user: { id: string };
	coordinate: [string, string];
	guests: { guest: string; entry_date: string }[];
	createdAt: string;
	updateAt: string;
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
	IDeleteGuestRequest,
	IDeleteGuestResponse,
};
