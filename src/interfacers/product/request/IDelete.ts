import { IProduct } from "..";

export interface IDeleteRequest extends Pick<IProduct, "id"> {}
