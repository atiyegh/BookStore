import { toast } from "react-toastify"


const notify = (text , type) => {
    if(type === "success") { 
        toast.success(text , {
            theme : "colored"
        })
    } else if( type === "error") {
        toast.error(text , {
            theme : "colored"
        })
    } else if(type === 'warning') {
        toast.warning(text , {
            theme : "colored"
        })
    }
}

export default notify;