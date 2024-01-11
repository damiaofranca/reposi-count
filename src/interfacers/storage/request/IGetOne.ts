import { IStorage } from "..";

export interface IGetOneRequest extends Pick<IStorage, "id"> {}
