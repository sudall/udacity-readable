import {Action, ActionCreator} from "redux";
import PostData from "src/data/models/PostData";

const actionTypePropertyKey = "actionType";

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

interface PayloadAction<TPayload> extends Action {
    payload: TPayload;
}

const actionCreator = (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
    const originalMethod = descriptor.value;

    if (originalMethod == null) {
        return;
    }

    originalMethod[actionTypePropertyKey] = propertyKey;
};

class PostActions extends ActionGenerator {
    @actionCreator
    upvote(post: PostData): PayloadAction<PostData> {
        return this.createAction(this.upvote, post);
    }
}

export default new PostActions("POST");