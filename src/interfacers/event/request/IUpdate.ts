import { IEvent } from "../index";

export interface IDataUpdateRequest
	extends Omit<
		IEvent,
		"id" | "link_detail" | "coordinate" | "createdAt" | "updateAt"
	> {
	coordinate: string;
}

export interface IUpdateRequest {
	id: string;
	data: IDataUpdateRequest;
}
