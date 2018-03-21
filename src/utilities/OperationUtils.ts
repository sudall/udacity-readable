import {OperationState} from "src/components/readable/ReadableApplication";
import ActionMeta from "src/redux-actions/framework/ActionMeta";

class OperationUtils {
    static getOperationStatus(operationId: string, operationState: OperationState) {
        let status = operationState.operations[operationId];

        if (status == null) {
            status = {
                isPending: false,
                hasCompleted: false,
                error: null
            }
        }

        return status;
    }

    //TODO
    // static getNextOperationId(action: ActionMeta<any, any>) {
    //     return action.getNextOperationId();
    // }
}

export default OperationUtils;