import * as React from "react";
import CssBaseline from "material-ui/CssBaseline";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import deepPurple from "material-ui/colors/deepPurple";
import lime from "material-ui/colors/lime"
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore, Middleware} from "redux";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import CommentData from "src/data/models/CommentData";
import PostData from "src/data/models/PostData";
import CategoryData from "src/data/models/CategoryData";
import PayloadAction from "src/redux-actions/framework/PayloadAction";
import PostConnector from "src/data/connectors/PostConnector";
import CommentConnector from "src/data/connectors/CommentConnector";
import CategoryConnector from "src/data/connectors/CategoryConnector";
import ActionMeta from "src/redux-actions/framework/ActionMeta";

export type PostIdToPostDataMap = {[postId: string]: PostData};
export type PostState = {
    posts: PostIdToPostDataMap;
}

export type CommentIdToCommentDataMap = {[commentId: string]: CommentData};
export type CommentState = {
    comments: CommentIdToCommentDataMap;
}

export type CategoryPathToCategoryDataMap = {[categoryPath: string]: CategoryData};
export type CategoryState = {
    categories: CategoryPathToCategoryDataMap;
}

export type OperationIdToOperationStatusMap = {[operationId: string]: OperationStatus};
export type OperationStatus = {
    isPending: boolean;
    hasCompleted: boolean;
    error: Error | null;
};
export type OperationState = {
    operations: OperationIdToOperationStatusMap;
}

export class ApplicationState {
    categories: CategoryPathToCategoryDataMap = {};

    postState: PostState = {
        posts: {},
    };

    commentState: CommentState = {
        comments: {}
    };

    operationState: OperationState = {
        operations: {}
    }
}

// props that are provided as parameters
interface IOwnProps {

}

// props that are provided via injection
interface IInjectedProps {

}

type IAllProps = IOwnProps & IInjectedProps;

class State {

}

class ReadableApplication extends React.Component<IAllProps, State> {
    readonly state = new State();

    theme = createMuiTheme({
        palette: {
            type: 'dark',
            primary: deepPurple,
            secondary: lime
        },
    });

    private static createReduxStore() {
        const composeEnhancers =
            typeof window === 'object' &&
            window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] ?
                window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]({
                    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
                }) : compose;

        const allEpics = ActionMeta.getAllRootEpics();

        const rootEpic = combineEpics.apply(null, allEpics);

        const middleware: Middleware = createEpicMiddleware(rootEpic, {
            dependencies: {
                postConnector: PostConnector.instance,
                commentConnector: CommentConnector.instance,
                categoryConnector: CategoryConnector.instance
            }
        });

        const enhancer = composeEnhancers(
            applyMiddleware(middleware),
            // other store enhancers if any
        );

        const reducer = (state = new ApplicationState(), action: PayloadAction<any>): ApplicationState => {
            const actionMeta = ActionMeta.getActionMetaByType(action.type);

            if (actionMeta == null) {
                console.warn(`No action found for type: ${action.type}`);
                return state;
            }

            // if there is a state key specified...
            if (actionMeta.reducerStateKey != null) {
                // only run the reducer against that part of state
                let newState = {
                    ...state,
                    [actionMeta.reducerStateKey]: actionMeta.reducer(state[actionMeta.reducerStateKey], action)
                };

                actionMeta.registeredReducers.forEach((reducerInfo) => {
                    let modifiedState = {
                        ...newState,
                        [reducerInfo.reducerStateKey]: reducerInfo.reducer(newState[reducerInfo.reducerStateKey], action)
                    };
                    Object.assign(newState, modifiedState);
                });

                return newState;
            }

            // otherwise, run the reducer on the entire state
            return actionMeta.reducer(state, action);
        };

        return createStore(reducer, enhancer);
    }

    render() {
        const {} = this.props;

        return (
            <Provider store={ReadableApplication.createReduxStore()}>
                <>
                <MuiThemeProvider theme={this.theme}>
                    <CssBaseline/>
                    {/*<DropDownSelectMultipleMaterial/>*/}
                    <DropDownSelectMultiple/>
                    <div style={{height: 100}}/>
                    {/*<ReadableApplicationRouter/>*/}
                    <InfiniteScrollTable/>
                </MuiThemeProvider>
                </>
            </Provider>
        );
    }
}

export default ReadableApplication;