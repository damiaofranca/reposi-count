import { IProduct } from "../index";

export interface ITransferRequest extends Pick<IProduct, "id" | "quantity"> {
	transfer_to: string;
}
