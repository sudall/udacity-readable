import {OperationState} from "src/components/readable/ReadableApplication";

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
}

export default OperationUtils;