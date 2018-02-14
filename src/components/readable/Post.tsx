import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplicationBootstrapper";

interface IProps {

}

class State {

}

// represents a full post
class Post extends React.Component<IProps, State> {
    readonly state = new State();

    render() {
        return (
            <div></div>
        );
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: IProps) => {
    return {
        // Add mapped properties here
    }
};

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>, ownProps: IProps) => {
    return {
        // Add mapped properties here
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);