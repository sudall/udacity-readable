// import * as React from "react";
// import {connect, Dispatch} from "react-redux";
// import {ApplicationState} from "src/components/readable/ReadableApplication";
// import {bindActionCreators} from "redux";
// import {OptionComponentProps} from "react-select";
//
// // props that are provided as parameters
// interface IOwnProps {
//
// }
//
// // props that are provided via injection
// interface IInjectedProps {
//     // someAction: () => void;
// }
//
// type IAllProps = IOwnProps & IInjectedProps & OptionValueComponentProps;
//
// // internal state of the component
// interface IState {
//
// }
//
// class CustomOptionValue extends React.Component<IAllProps, IState> {
//     readonly state: IState = {};
//
//     static propTypes = {
//         // children: CustomComponentValidators.createChildrenTypesValidator([])
//     };
//
//     render() {
//         const {} = this;
//         const {} = this.props;
//         const {} = this.state;
//
//         return <>
//
//         </>;
//     }
// }
//
// const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps) => {
//     return {
//         // Add mapped properties here
//     }
// };
//
// const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>, ownProps: IOwnProps) => {
//     return {
//         // Add mapped properties here
//         // someAction: SomeActionSet.instance.someAction.bindToDispatch(dispatch)
//     };
// };
//
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(CustomOptionValue);