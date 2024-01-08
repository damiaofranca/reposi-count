import { IEvent } from "..";

export interface IGetOneRequest extends Pick<IEvent, "id"> {}
