import ActionSet from "src/redux-actions/framework/ActionSet";
import {OperationIdToOperationStatusMap, OperationState} from "src/components/readable/ReadableApplication";
import ActionMeta from "src/redux-actions/framework/ActionMeta";
import PayloadAction from "src/redux-actions/framework/PayloadAction";

class OperationStatusUtils {
    static startOperation(operationId: string,
        operationsState: OperationIdToOperationStatusMap): OperationIdToOperationStatusMap {
        return {
            ...operationsState,
            [operationId]: {isPending: true, hasCompleted: false, error: null}
        }
    }

    static completeOperation(operationId: string,
        operationsState: OperationIdToOperationStatusMap): OperationIdToOperationStatusMap {
        return {
            ...operationsState,
            [operationId]: {isPending: false, hasCompleted: true, error: null}
        }
    }

    static failOperation(operationId: string, error: Error,
        operationsState: OperationIdToOperationStatusMap): OperationIdToOperationStatusMap {
        return {
            ...operationsState,
            [operationId]: {isPending: false, hasCompleted: false, error: error}
        }
    }
}

class Start extends ActionMeta<string, OperationState> {
    reducer(state: OperationState, action: PayloadAction<string>): OperationState {
        const operationId = action.payload;
        return {
            ...state,
            operations: OperationStatusUtils.startOperation(operationId, state.operations)
        };
    }
}

class Complete extends ActionMeta<string, OperationState> {
    reducer(state: OperationState, action: PayloadAction<string>): OperationState {
        const operationId = action.payload;
        return {
            ...state,
            operations: OperationStatusUtils.completeOperation(operationId, state.operations)
        };
    }
}

export interface FailParams {
    operationId: string,
    error: Error
}

class Fail extends ActionMeta<FailParams, OperationState> {
    reducer(state: OperationState, action: PayloadAction<FailParams>): OperationState {
        const {operationId, error} = action.payload;
        return {
            ...state,
            operations: OperationStatusUtils.failOperation(operationId, error, state.operations)
        };
    }
}

class OperationActions extends ActionSet<"operationState", OperationState> {
    start = new Start(this);
    complete = new Complete(this);
    fail = new Fail(this);
}

export default new OperationActions("operationState");