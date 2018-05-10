import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import {bindActionCreators} from "redux";
import {Column, InfiniteLoader, Table} from "react-virtualized";
import {Observable} from "rxjs/Observable";
import {InfiniteLoaderChildProps} from "react-virtualized/dist/es/InfiniteLoader";

// props that are provided as parameters
interface IOwnProps {

}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => void;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
interface IState {

}

class UserData {
    name: string;
    phone: string;
    age: number;
}

class InfiniteScrollTable extends React.Component<IAllProps, IState> {
    readonly state: IState = {};

    private static fakeTableData: UserData[] = [
        {
            name: "Bob",
            age: 12,
            phone: "40322131233"
        },
        {
            name: "Bob",
            age: 12,
            phone: "40322131233"
        },
        {
            name: "Bob",
            age: 12,
            phone: "40322131233"
        },
    ];

    private loadedTableData: {[index: number]: UserData} = {};

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    render() {
        const {} = this;
        const {} = this.props;
        const {} = this.state;

        return (
            <>
                <InfiniteLoader isRowLoaded={({index}) => {
                                    return this.loadedTableData[index] != null;
                                }}
                                loadMoreRows={({startIndex, stopIndex}) => {
                                    return Observable.timer(1500)
                                        .toPromise()
                                        .then(() => {
                                            const newLoadedTableData: UserData[] = [];

                                            Object.keys(this.loadedTableData)
                                                .forEach((key) => {
                                                    const keyNumber = parseInt(key);
                                                    const distanceFromStartIndex = Math.abs(keyNumber - startIndex);
                                                    const distanceFromStopIndex = Math.abs(keyNumber - stopIndex);
                                                    if (distanceFromStartIndex <= 100 || distanceFromStopIndex <= 100) {
                                                        newLoadedTableData[key] = this.loadedTableData[key];
                                                    }
                                                });

                                            this.loadedTableData = newLoadedTableData;

                                            for (let i = startIndex; i <= stopIndex; i++) {
                                                const rowData = {
                                                    ...InfiniteScrollTable.fakeTableData[0]
                                                };

                                                rowData.age = i + 1;
                                                rowData.name = rowData.name + rowData.age;

                                                this.loadedTableData[i] = rowData;
                                            }
                                        });
                                }}
                                minimumBatchSize={50}
                                rowCount={1000}>
                    {({onRowsRendered, registerChild}: InfiniteLoaderChildProps) =>
                        <Table height={750}
                               rowHeight={75}
                               rowCount={1000}
                               width={1000}
                               headerHeight={75}
                               rowGetter={({index}) => {
                                   return this.loadedTableData[index] || {name: "Loading"};
                               }}
                               onRowsRendered={onRowsRendered}
                               ref={registerChild}
                               onHeaderClick={() => alert("you clicked a header")}
                               rowStyle={{display: "flex"}}>
                            <Column label={"Name"} dataKey={"name"} width={100}/>
                            <Column label={"Age"} dataKey={"age"} width={100}/>
                            <Column label={"Phone"} dataKey={"phone"} width={100}/>
                        </Table>
                    }
                </InfiniteLoader>
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps) => {
    return {
        // Add mapped properties here
    }
};

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>, ownProps: IOwnProps) => {
    return {
        // Add mapped properties here
        // someAction: SomeActionSet.instance.someAction.bindToDispatch(dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InfiniteScrollTable);