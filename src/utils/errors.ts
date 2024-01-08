/* eslint-disable @typescript-eslint/no-unused-expressions */
import { AxiosResponse } from "axios";
import { showExpectionToast } from "./toastException";


export class ExceptionError {
    private  modules :any = {
        '/auth/signin': {
            404 : ()=> {
                showExpectionToast(404,"Usuário não encontrado.")
            }
        }
    }

    constructor(private _AxiosResponse: AxiosResponse<any, any>){
        
        if((this._AxiosResponse.status < 200 || this._AxiosResponse.status > 299) && this._AxiosResponse.config.url){
            this.modules[this._AxiosResponse.config.url][this._AxiosResponse.config.url]
        }
    }
}