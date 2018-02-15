import * as React from "react";
import Typography from "material-ui/Typography";
import ArrowUpward from "material-ui-icons/ArrowUpward";
import ArrowDownward from "material-ui-icons/ArrowDownward";
import Card from "material-ui/Card";
import CardContent from "material-ui/Card/CardContent";
import CardActions from "material-ui/Card/CardActions";
import IconButton from "material-ui/IconButton";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import CommentData from "src/data/models/CommentData";
import CommentActions from "src/redux-actions/CommentActions";

// props that are provided as parameters
interface IOwnProps {
    comment: CommentData;
}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
    upvote: () => void;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {

}

class Comment extends React.Component<IAllProps, State> {
    readonly state = new State();

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    render() {
        const {comment, upvote} = this.props;

        return (
            <Card>
                <CardContent>
                    <Typography>
                        {comment.body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={upvote}>
                        <ArrowUpward/>
                    </IconButton>
                    <Typography>
                        {comment.voteScore}
                    </Typography>
                    <IconButton>
                        <ArrowDownward/>
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps) => {
    return {
        // Add mapped properties here
    }
};

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>, ownProps: IOwnProps) => {
    const upvote = CommentActions.upvote.bind(CommentActions);
    return {
        // Add mapped properties here
        // someAction: bindActionCreators(actionCreator, dispatch)
        upvote
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment);