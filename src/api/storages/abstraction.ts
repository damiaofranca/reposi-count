import {
	ICreateRequest,
	IGetAllRequest,
	IGetAllResponse,
	IGetOneRequest,
	IGetOneResponse,
	IUpdateRequest,
	IDeleteRequest,
	IDashboardResponse,
	IDashboardRequest,
	ITransitionResponse,
} from "../../interfacers/storage";

export abstract class StorageAbstraction {
	public abstract create(payload: ICreateRequest): Promise<void>;

	public abstract getAll(payload: IGetAllRequest): Promise<IGetAllResponse>;

	public abstract getOne(payload: IGetOneRequest): Promise<IGetOneResponse>;

	public abstract update(payload: IUpdateRequest): Promise<void>;

	public abstract delete(payload: IDeleteRequest): Promise<void>;

	public abstract dashboard(
		payload: IDashboardRequest,
	): Promise<IDashboardResponse>;

	public abstract transactionHistoric(
		payload: IDashboardRequest,
	): Promise<ITransitionResponse[]>;
}
