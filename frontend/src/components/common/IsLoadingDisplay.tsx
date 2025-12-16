import {Loader} from "lucide-react";


const IsLoadingDisplay = () => {
    return (
        <div className="flex items-center justify-center h-[60vh]">
            <Loader className="w-6 h-6 animate-spin text-primary" />
        </div>
    )
}

export default IsLoadingDisplay