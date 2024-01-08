import { toast } from "react-toastify";



export const showExpectionToast = (error: number,message: string)=> {
    toast[showTypeToast(error)](message, {
        autoClose: 2000,
        position: "top-right",
    });
}


const showTypeToast = (error: number): 'info' | 'success' |  'warning' | 'error'  => {

    switch (true) {
        case error >= 100 || error <= 199 :
            
        return "info"
        case error >= 200 || error <= 299 :
            
        return "success"
        case error >= 300 || error <= 399 :
            
        return "warning"
        case error >= 400 || error <= 499 :
            
        return "error"

        case error >= 500 || error <= 599 :
            
        return "error"

        default:
            return "success"
    }

}

