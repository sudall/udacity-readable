import {ApplicationState} from "src/components/readable/ReadableApplication";

// TODO Idea: ActionSets could register the location and shape of the state that they modify so that they don't need to
// TODO rely on ApplicationState having the right shape. Example: PostActions can register "postState" with shape PostState
// TODO perhaps namespaced under "actionSets" (or something more clear). "actionSets.postState.posts"
class ActionSet<TReducerStateKey extends keyof ApplicationState, TReducerState extends ApplicationState[TReducerStateKey]> {
    private static readonly TakenNamespaces = new Set<string>();

    readonly namespace = this.constructor.name;

    // this is only used to enforce the reducer state type. TypeScript seems to ignore type parameters if they aren't used
    private readonly reducerStateType: TReducerState;

    constructor(public readonly reducerStateKey: TReducerStateKey) {
        const namespace = this.namespace;
        if (ActionSet.isNamespaceTaken(namespace)) {
            throw new Error(`Namespace '${namespace}' is already taken.`);
        } else {
            ActionSet.takeNamespace(namespace);
        }
    }

    private static isNamespaceTaken(namespace: string): boolean {
        return ActionSet.TakenNamespaces.has(namespace);
    }

    private static takeNamespace(namespace: string) {
        this.TakenNamespaces.add(namespace);
    }
}

export default ActionSet;