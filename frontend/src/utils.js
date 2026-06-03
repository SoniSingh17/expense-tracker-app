import { toast } from "react-toastify";

export const handleSuccess = (meg)=>{
    toast.success(meg ,   {
        position : "top-right"
    })

}
export const handleError = (meg)=>{
    toast.error(meg ,   {
        position : "top-right"
    })

}
