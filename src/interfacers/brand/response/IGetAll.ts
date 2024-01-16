import { IBrand } from "..";
import { IBaseList } from "../../common/iBaseList";

export interface IGetAllResponse extends IBaseList<IBrand> {}

export interface IGetAllNoPaginationResponse extends IBrand {}
