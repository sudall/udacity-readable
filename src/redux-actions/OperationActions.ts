import ActionSet from "src/redux-actions/framework/ActionSet";
import {
    ApplicationState, OperationIdToOperationStatusMap,
    OperationState
} from "src/components/readable/ReadableApplication";
import ActionMeta, {FilteredEpic} from "src/redux-actions/framework/ActionMeta";
import PayloadAction from "src/redux-actions/framework/PayloadAction";
import {merge} from "rxjs/observable/merge";
import {Observable} from "rxjs/Rx";

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

    static validateOperationId(operationId: string) {
        if (operationId == null || operationId === "") {
            console.warn("Operation ID must not be empty or null/undefined!");
            return false;
        }

        return true;
    }
}

export abstract class Operation extends ActionMeta<any, any> {
    constructor(actionSet: ActionSet<any, any>,
        private startAction: ActionMeta<any, any>,
        private completedAction: ActionMeta<any, any>,
        private failedAction?: ActionMeta<{error: Error}, any>) {
        super(actionSet);
    }

    epic: FilteredEpic<PayloadAction<any>, ApplicationState> =
        (filteredAction$, store, {}, allAction$): Observable<PayloadAction<any>> => {
            // look for actions that we know about
            const startAction$ = allAction$
                .ofType(this.startAction.type)
                .filter((action) => {
                    return action.operationId != null;
                })
                .map((action) => {
                    const operationId = <string>action.operationId;
                    return instance.start.factory(operationId);
                });

            const completedAction$ = allAction$
                .ofType(this.completedAction.type)
                .filter((action) => {
                    return action.operationId != null;
                })
                .map((action) => {
                    const operationId = <string>action.operationId;
                    return instance.complete.factory(operationId);
                });

            let failedAction$: Observable<PayloadAction<{error: Error}>> = Observable.empty();
            if (this.failedAction != null) {
                failedAction$ = allAction$
                    .ofType(this.failedAction.type)
                    .filter((action) => {
                        return action.operationId != null;
                    })
                    .map((action) => {
                        const operationId = <string>action.operationId;
                        return instance.fail.factory({
                            operationId,
                            error: action.payload.error
                        });
                    });
            }

            return merge(startAction$, completedAction$, failedAction$);
        };
}

class Start extends ActionMeta<string, OperationState> {
    reducer(state: OperationState, action: PayloadAction<string>): OperationState {
        const operationId = action.payload;

        OperationStatusUtils.validateOperationId(operationId);

        return {
            ...state,
            operations: OperationStatusUtils.startOperation(operationId, state.operations)
        };
    }
}

class Complete extends ActionMeta<string, OperationState> {
    reducer(state: OperationState, action: PayloadAction<string>): OperationState {
        const operationId = action.payload;

        OperationStatusUtils.validateOperationId(operationId);

        return {
            ...state,
            operations: OperationStatusUtils.completeOperation(operationId, state.operations)
        };
    }
}

module OperationActions {
    export interface FailParams {
        operationId: string,
        error: Error
    }
}

class Fail extends ActionMeta<OperationActions.FailParams, OperationState> {
    reducer(state: OperationState, action: PayloadAction<OperationActions.FailParams>): OperationState {
        const {operationId, error} = action.payload;

        OperationStatusUtils.validateOperationId(operationId);

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

const instance = new OperationActions("operationState");

export default instance;