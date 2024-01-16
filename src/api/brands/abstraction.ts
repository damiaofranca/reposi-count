import {
	ICreateRequest,
	IGetAllRequest,
	IGetAllResponse,
	IGetOneRequest,
	IGetOneResponse,
	IUpdateRequest,
	IDeleteRequest,
	IGetAllNoPaginationRequest,
	IGetAllNoPaginationResponse,
} from "../../interfacers/brand";

export abstract class BrandAbstraction {
	public abstract create(payload: ICreateRequest): Promise<void>;

	public abstract getAll(payload: IGetAllRequest): Promise<IGetAllResponse>;

	public abstract getAllWithNoPagination(
		payload: IGetAllNoPaginationRequest,
	): Promise<IGetAllNoPaginationResponse[]>;

	public abstract getOne(payload: IGetOneRequest): Promise<IGetOneResponse>;

	public abstract update(payload: IUpdateRequest): Promise<void>;

	public abstract delete(payload: IDeleteRequest): Promise<void>;
}
