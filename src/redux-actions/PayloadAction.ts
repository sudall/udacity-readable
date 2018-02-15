import {Action} from "redux";

interface PayloadAction<TPayload> extends Action {
    payload: TPayload;
}

export default PayloadAction;