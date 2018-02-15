import {Action, ActionCreator} from "redux";
import PayloadAction from "src/redux-actions/PayloadAction";

const actionTypePropertyKey = "actionType";

export const actionCreator = (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
    const originalMethod = descriptor.value;

    if (originalMethod == null) {
        return;
    }

    originalMethod[actionTypePropertyKey] = propertyKey;
};

class ActionGenerator {
    private static readonly TakenNamespaces = new Set<string>();

    private static isNamespaceTaken(namespace: string): boolean {
        return ActionGenerator.TakenNamespaces.has(namespace);
    }

    private static takeNamespace(namespace: string) {
        this.TakenNamespaces.add(namespace);
    }

    constructor(private namespace: string) {
        if (ActionGenerator.isNamespaceTaken(namespace)) {
            throw new Error(`Namespace '${namespace}' is already taken.`);
        } else {
            ActionGenerator.takeNamespace(namespace);
        }
    }

    private getFullyQualifiedActionType(type: string) {
        return `${this.namespace}.${type}`;
    }

    private static getActionCreatorActionType(actionCreator: ActionCreator<Action>) {
        return <string | null>actionCreator[actionTypePropertyKey];
    }

    private static hasActionType(actionCreator: ActionCreator<Action>) {
        return this.getActionCreatorActionType(actionCreator) != null;
    }

    protected createAction<TPayload>(creator: ActionCreator<Action>, payload: TPayload = <TPayload>{}): PayloadAction<TPayload> {
        let typeName = ActionGenerator.getActionCreatorActionType(creator);

        if (typeName == null) {
            throw new Error("An action creator must have an action type attached to it." +
                " Make sure you are using the @actionCreator decorator.");
        }

        return {
            type: this.getFullyQualifiedActionType(typeName),
            payload
        };
    }
}

export default ActionGenerator;