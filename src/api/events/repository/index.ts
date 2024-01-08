/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosInstance } from "axios";

import { EventAbstraction } from "../abstraction";
import { ICreateRequest, IGetAllRequest, IGetAllResponse, IGetOneRequest, IGetOneResponse, IUpdateRequest, IDeleteRequest, IDeleteGuestRequest } from "../../../interfacers/event";

export class ApiRepository implements EventAbstraction {
	constructor(private _api: AxiosInstance) {}

	public create(_payload: ICreateRequest): Promise<void> {
		return this._api.post(`/events`, _payload);
	}

	public async getAll(_payload: IGetAllRequest): Promise<IGetAllResponse> {
		return await this._api
			.get("/events", { params: _payload.filters })
			.then((val) => val.data);
	}

	public getOne(_payload: IGetOneRequest): Promise<IGetOneResponse> {
		return this._api.get(`/events/${_payload.id}`).then((val) => val.data);
	}

	public update(_payload: IUpdateRequest): Promise<void> {
		return this._api.put(`/events/${_payload.id}`, _payload.data);
	}

	public delete(_payload: IDeleteRequest): Promise<void> {
		return this._api.delete(`/events/${_payload.id}`);
	}

	public deleteGuest(_payload: IDeleteGuestRequest): Promise<void> {
		return this._api.delete(`/events/${_payload.id}/guest`, {
			data: { email: _payload.guest },
		});
	}
}
