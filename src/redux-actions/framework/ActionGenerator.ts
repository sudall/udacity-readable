// import {Action, ActionCreator} from "redux";
// import PayloadAction from "src/redux-actions/PayloadAction";
//
// const actionTypePropertyKey = "actionType";
//
// export const actionCreator = (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
//     const originalMethod = descriptor.value;
//
//     if (originalMethod == null) {
//         return;
//     }
//
//     originalMethod[actionTypePropertyKey] = propertyKey;
// };
//
// class ActionGenerator {
//     private static readonly TakenNamespaces = new Set<string>();
//
//     private static isNamespaceTaken(namespace: string): boolean {
//         return ActionGenerator.TakenNamespaces.has(namespace);
//     }
//
//     private static takeNamespace(namespace: string) {
//         this.TakenNamespaces.add(namespace);
//     }
//
//     constructor(private namespace: string) {
//         if (ActionGenerator.isNamespaceTaken(namespace)) {
//             throw new Error(`Namespace '${namespace}' is already taken.`);
//         } else {
//             ActionGenerator.takeNamespace(namespace);
//         }
//     }
//
//     getFullyQualifiedActionType(actionCreator: ActionCreator<Action>) {
//         let typeName = ActionGenerator.getActionCreatorActionType(actionCreator);
//
//         if (typeName == null) {
//             throw new Error("An action creator must have an action type attached to it." +
//                 " Make sure you are using the @actionCreator decorator.");
//         }
//
//         return `${this.namespace}.${typeName}`;
//     }
//
//     private static getActionCreatorActionType(actionCreator: ActionCreator<Action>) {
//         return <string | null>actionCreator[actionTypePropertyKey];
//     }
//
//     private static hasActionType(actionCreator: ActionCreator<Action>) {
//         return this.getActionCreatorActionType(actionCreator) != null;
//     }
//
//     protected createAction<TPayload>(creator: ActionCreator<Action>, payload: TPayload = <TPayload>{}): PayloadAction<TPayload> {
//         return {
//             type: this.getFullyQualifiedActionType(creator),
//             payload
//         };
//     }
// }
//
// export default ActionGenerator;