import iView from "iview";

let func = {}

func.message = function (error) {
    if (error.response === undefined){
        console.error(error);
        return;
    }

    iView.Message.error(error.response.data.status_msg)
}

export default func