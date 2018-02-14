import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import ReadableApplication from "src/components/readable/ReadableApplication";
import {Provider} from "react-redux";
import {Action, applyMiddleware, compose, createStore, Middleware} from "redux";
import {ActionsObservable, createEpicMiddleware, Epic} from "redux-observable";
import {Observable} from "rxjs";
import CommentData from "src/data/models/CommentData";
import PostData from "src/data/models/PostData";

export class ApplicationState {
    posts: PostData[] = [];
    comments: CommentData[] = [];
}

interface IProps {

}

class State {

}

class ReadableApplicationBootstrapper extends React.Component<IProps, State> {
    readonly state = new State();

    static createReduxStore() {
        const composeEnhancers =
            typeof window === 'object' &&
            window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] ?
                window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]({
                    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
                }) : compose;

        const rootEpic: Epic<Action, ApplicationState> = (action$: ActionsObservable<Action>): Observable<Action> => {
            // TODO
            return Observable.empty<Action>();
        };

        const middleware: Middleware = createEpicMiddleware(rootEpic);

        const enhancer = composeEnhancers(
            applyMiddleware(middleware),
            // other store enhancers if any
        );

        const reducer = (state = new ApplicationState(), action: Action) => {
            switch (action.type) {

                default:
                    return state;
            }
        };

        return createStore(reducer, enhancer);
    }

    render() {
        return (
            <BrowserRouter>
                <Provider store={ReadableApplicationBootstrapper.createReduxStore()}>
                    <ReadableApplication />
                </Provider>
            </BrowserRouter>
        );
    }
}

export default ReadableApplicationBootstrapper;