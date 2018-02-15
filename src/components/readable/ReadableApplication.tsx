import * as React from "react";
import Reboot from "material-ui/Reboot";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import deepPurple from "material-ui/colors/deepPurple";
import lime from "material-ui/colors/lime"
import {Provider} from "react-redux";
import {Action, applyMiddleware, compose, createStore, Middleware} from "redux";
import {ActionsObservable, createEpicMiddleware, Epic} from "redux-observable";
import {Observable} from "rxjs/Rx";
import CommentData from "src/data/models/CommentData";
import PostData from "src/data/models/PostData";
import CategoryData from "src/data/models/CategoryData";
import ReadableApplicationRouter from "src/components/readable/ReadableApplicationRouter";

export class ApplicationState {
    categories: CategoryData[] = [
        {
            name: "Some category 1",
            urlPath: "Some category 1"
        },
        {
            name: "Some category 2",
            urlPath: "Some category 2"
        },
        {
            name: "Some category 3",
            urlPath: "Some category 3"
        }
    ];

    posts: PostData[] = [
        {
            author: "Some author",
            body: "Some body",
            category: "Some category 1",
            deleted: false,
            id: "someUniqueId",
            timestamp: 123412312,
            title: "Some Title",
            voteScore: 1
        },
        {
            author: "Some author 2",
            body: "Some body 2",
            category: "Some category 1",
            deleted: false,
            id: "someUniqueId2",
            timestamp: 123412313,
            title: "Some Title 2",
            voteScore: 10
        },
        {
            author: "Some author 3",
            body: "Some body 3",
            category: "Some category 2",
            deleted: false,
            id: "someUniqueId3",
            timestamp: 123412314,
            title: "Some Title 3",
            voteScore: 100
        }
    ];

    comments: CommentData[] = [
        {
            parentId: "someUniqueId",
            author: "Some guy on the internet",
            body: "Body stuff",
            deleted: false,
            id: "someCommentId",
            parentDeleted: false,
            timestamp: 123412313,
            voteScore: 12
        }
    ];
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