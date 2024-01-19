/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosInstance } from "axios";

import { ProductAbstraction } from "../abstraction";
import {
	ICreateRequest,
	IGetAllRequest,
	IGetOneRequest,
	IUpdateRequest,
	IDeleteRequest,
	IGetAllResponse,
	IGetOneResponse,
	ITransferRequest,
} from "../../../interfacers/product";

export class ApiRepository implements ProductAbstraction {
	constructor(private _api: AxiosInstance) {}

	public create(_payload: ICreateRequest): Promise<void> {
		return this._api.post(`/products`, _payload);
	}

	public async getAll(_payload: IGetAllRequest): Promise<IGetAllResponse> {
		return await this._api
			.get("/products", { params: _payload.filters })
			.then((val) => val.data);
	}

	public getOne(_payload: IGetOneRequest): Promise<IGetOneResponse> {
		return this._api.get(`/products/${_payload.id}`).then((val) => val.data);
	}

	public update(_payload: IUpdateRequest): Promise<void> {
		return this._api.put(`/products/${_payload.id}`, _payload.data);
	}

	public delete(_payload: IDeleteRequest): Promise<void> {
		return this._api.delete(`/products/${_payload.id}`);
	}

	public transfer(_payload: ITransferRequest): Promise<void> {
		return this._api.post(`/products/transfer`, _payload);
	}
}
