import {
	ICreateRequest,
	IDeleteRequest,
	IGetAllRequest,
	IGetOneRequest,
	IUpdateRequest,
	IGetAllResponse,
	IGetOneResponse,
	IGetAllNoPaginationResponse,
	IGetAllNoPaginationRequest,
} from "../../interfacers/brand";
import { BrandAbstraction } from "./abstraction";

export class BrandService implements BrandAbstraction {
	constructor(private repo: BrandAbstraction) {}

	public create(payload: ICreateRequest): Promise<void> {
		return this.repo.create(payload);
	}

	public getAll(payload: IGetAllRequest): Promise<IGetAllResponse> {
		return this.repo.getAll(payload);
	}

	public getAllWithNoPagination(
		payload: IGetAllNoPaginationRequest,
	): Promise<IGetAllNoPaginationResponse[]> {
		return this.repo.getAllWithNoPagination(payload);
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
}
