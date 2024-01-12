import {
	ICreateRequest,
	IGetAllRequest,
	IGetOneRequest,
	IUpdateRequest,
	IDeleteRequest,
	IGetAllResponse,
	IGetOneResponse,
} from "../../interfacers/product";

export abstract class ProductAbstraction {
	public abstract create(payload: ICreateRequest): Promise<void>;

	public abstract getAll(payload: IGetAllRequest): Promise<IGetAllResponse>;

	public abstract getOne(payload: IGetOneRequest): Promise<IGetOneResponse>;

	public abstract update(payload: IUpdateRequest): Promise<void>;

	public abstract delete(payload: IDeleteRequest): Promise<void>;
}
