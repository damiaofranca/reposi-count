/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosInstance } from "axios";

import { BrandAbstraction } from "../abstraction";
import {
	ICreateRequest,
	IGetAllRequest,
	IGetAllResponse,
	IGetOneRequest,
	IGetOneResponse,
	IUpdateRequest,
	IDeleteRequest,
	IGetAllNoPaginationResponse,
	IGetAllNoPaginationRequest,
} from "../../../interfacers/brand";

export class ApiRepository implements BrandAbstraction {
	constructor(private _api: AxiosInstance) {}
	public create(_payload: ICreateRequest): Promise<void> {
		return this._api.post(`/brands`, _payload);
	}

	public async getAll(_payload: IGetAllRequest): Promise<IGetAllResponse> {
		return await this._api
			.get("/brands", { params: _payload.filters })
			.then((val) => val.data);
	}

	public async getAllWithNoPagination(
		_payload: IGetAllNoPaginationRequest,
	): Promise<IGetAllNoPaginationResponse[]> {
		return await this._api
			.get("/brands", { params: _payload.filters })
			.then((val) => val.data);
	}

	public getOne(_payload: IGetOneRequest): Promise<IGetOneResponse> {
		return this._api.get(`/brands/${_payload.id}`).then((val) => val.data);
	}

	public update(_payload: IUpdateRequest): Promise<void> {
		return this._api.put(`/brands/${_payload.id}`, _payload.data);
	}

	public delete(_payload: IDeleteRequest): Promise<void> {
		return this._api.delete(`/brands/${_payload.id}`);
	}
}
