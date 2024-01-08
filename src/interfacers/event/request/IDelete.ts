import { IEvent } from "..";

export interface IDeleteRequest extends Pick<IEvent, "id"> {}
