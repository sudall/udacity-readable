import * as React from "react";
import Reboot from "material-ui/Reboot";
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
import ReadableApplicationRouter from "src/components/readable/ReadableApplicationRouter";
import PayloadAction from "src/redux-actions/PayloadAction";
import "src/utilities/RxOperators";
import {ActionMeta} from "src/redux-actions/PostActions2";
import "core-js";

export type PostIdToPostDataMap = {[postId: number]: PostData};
export type CommentIdToCommentDataMap = {[commentId: number]: CommentData};
export type CategoryPathToCategoryDataMap = {[categoryPath: string]: CategoryData};

export class ApplicationState {
    categories: CategoryPathToCategoryDataMap = {};

    posts: PostIdToPostDataMap = {};

    comments: CommentIdToCommentDataMap = {};
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

        const middleware: Middleware = createEpicMiddleware(rootEpic);

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
            if (actionMeta.reducerStateKey != undefined) {
                // only run the reducer against that part of state
                return {
                    ...state,
                    [actionMeta.reducerStateKey]: actionMeta.reducer(state[actionMeta.reducerStateKey], action)
                }
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
                <MuiThemeProvider theme={this.theme}>
                    <Reboot/>
                    <ReadableApplicationRouter/>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default ReadableApplication;