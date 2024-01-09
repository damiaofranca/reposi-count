import {
	ICreateRequest,
	IGetAllRequest,
	IGetAllResponse,
	IGetOneRequest,
	IGetOneResponse,
	IUpdateRequest,
	IDeleteRequest,
	IDeleteGuestRequest,
} from "../../interfacers/brand";

export abstract class BrandAbstraction {
	public abstract create(payload: ICreateRequest): Promise<void>;

	public abstract getAll(payload: IGetAllRequest): Promise<IGetAllResponse>;

	public abstract getOne(payload: IGetOneRequest): Promise<IGetOneResponse>;

	public abstract update(payload: IUpdateRequest): Promise<void>;

	public abstract delete(payload: IDeleteRequest): Promise<void>;

	public abstract deleteGuest(payload: IDeleteGuestRequest): Promise<void>;
}
