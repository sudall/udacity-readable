import {Action} from "redux";

interface PayloadAction<TPayload> extends Action {
    payload: TPayload;
    operationId?: string;
}

export default PayloadAction;