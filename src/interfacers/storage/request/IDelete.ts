import { IStorage } from "..";

export interface IDeleteRequest extends Pick<IStorage, "id"> {}
