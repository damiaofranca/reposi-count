/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosInstance } from "axios";

import { StorageAbstraction } from "../abstraction";
import {
	ICreateRequest,
	IGetAllRequest,
	IGetAllResponse,
	IGetOneRequest,
	IGetOneResponse,
	IUpdateRequest,
	IDeleteRequest,
} from "../../../interfacers/storage";

export class ApiRepository implements StorageAbstraction {
	constructor(private _api: AxiosInstance) {}

	public create(_payload: ICreateRequest): Promise<void> {
		return this._api.post(`/storages`, _payload);
	}

	public async getAll(_payload: IGetAllRequest): Promise<IGetAllResponse> {
		return await this._api
			.get("/storages", { params: _payload.filters })
			.then((val) => val.data);
	}

	public getOne(_payload: IGetOneRequest): Promise<IGetOneResponse> {
		return this._api.get(`/storages/${_payload.id}`).then((val) => val.data);
	}

	public update(_payload: IUpdateRequest): Promise<void> {
		return this._api.put(`/storages/${_payload.id}`, _payload.data);
	}

	public delete(_payload: IDeleteRequest): Promise<void> {
		return this._api.delete(`/storages/${_payload.id}`);
	}
}
