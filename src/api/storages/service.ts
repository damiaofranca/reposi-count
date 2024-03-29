import {
	ICreateRequest,
	IDeleteRequest,
	IGetAllRequest,
	IUpdateRequest,
	IGetOneRequest,
	IGetAllResponse,
	IGetOneResponse,
	IDashboardRequest,
	IDashboardResponse,
	ITransitionResponse,
} from "../../interfacers/storage";
import { StorageAbstraction } from "./abstraction";

export class StorageService implements StorageAbstraction {
	constructor(private repo: StorageAbstraction) {}

	public create(payload: ICreateRequest): Promise<void> {
		return this.repo.create(payload);
	}

	public getAll(payload: IGetAllRequest): Promise<IGetAllResponse> {
		return this.repo.getAll(payload);
	}

	public getOne(payload: IGetOneRequest): Promise<IGetOneResponse> {
		return this.repo.getOne(payload);
	}

	public update(payload: IUpdateRequest): Promise<void> {
		return this.repo.update(payload);
	}

	public delete(payload: IDeleteRequest): Promise<void> {
		return this.repo.delete(payload);
	}

	public dashboard(payload: IDashboardRequest): Promise<IDashboardResponse> {
		return this.repo.dashboard(payload);
	}

	public transactionHistoric(
		payload: IDashboardRequest,
	): Promise<ITransitionResponse[]> {
		return this.repo.transactionHistoric(payload);
	}
}
