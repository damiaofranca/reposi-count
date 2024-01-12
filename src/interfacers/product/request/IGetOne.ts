import { IProduct } from "..";

export interface IGetOneRequest extends Pick<IProduct, "id"> {}
