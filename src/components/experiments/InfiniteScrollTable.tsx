import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import {bindActionCreators} from "redux";
import {AutoSizer, Column, InfiniteLoader, Table, WindowScroller} from "react-virtualized";
import {Observable} from "rxjs/Observable";
import {InfiniteLoaderChildProps} from "react-virtualized/dist/es/InfiniteLoader";
import "react-virtualized/styles.css";

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

class FakeTableData {
    name: string;
    phone: string;
    id: number;
}

class InfiniteScrollTable extends React.Component<IAllProps, IState> {
    readonly state: IState = {};

    private static fakeTableData: FakeTableData[] = [
        {
            name: "Client",
            id: 12,
            phone: "40322131233"
        }
    ];

    private loadedTableData: {[index: number]: FakeTableData} = {};

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    private isRowLoaded = ({index}: {index: number}) => {
        return this.loadedTableData[index] != null;
    };

    render() {
        const {isRowLoaded} = this;
        const {} = this.props;
        const {} = this.state;

        return (
            <>
                <div>
                    Stuff above
                </div>
                <InfiniteLoader minimumBatchSize={50}
                                threshold={50}
                                rowCount={1000}
                                isRowLoaded={isRowLoaded}
                                loadMoreRows={({startIndex, stopIndex}) => {
                                    return Observable.timer(1500)
                                        .toPromise()
                                        .then(() => {
                                            const newLoadedTableData: FakeTableData[] = [];

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

                                                rowData.id = i + 1;
                                                rowData.name = rowData.name + rowData.id;

                                                this.loadedTableData[i] = rowData;
                                            }
                                        });
                                }}>
                    {({onRowsRendered, registerChild}: InfiniteLoaderChildProps) =>
                        <WindowScroller>
                            {({height, width, isScrolling, scrollTop, onChildScroll}) =>
                                <AutoSizer disableHeight>
                                    {({width}) =>
                                        <Table height={height}
                                               autoHeight
                                               rowHeight={75}
                                               rowCount={1000}
                                               width={width}
                                               scrollTop={scrollTop}
                                               onScroll={onChildScroll}
                                               isScrolling={isScrolling}
                                               headerHeight={75}
                                               rowGetter={({index}) => {
                                                   return this.loadedTableData[index] || {};
                                               }}
                                               onRowsRendered={onRowsRendered}
                                               ref={registerChild}
                                               onHeaderClick={() => alert("you clicked a header")}
                                               rowStyle={({index}) => {
                                                   return {
                                                       backgroundColor: index % 2 === 0 ? "lightgrey" : "grey"
                                                   }
                                               }}
                                                rowClassName={"ReactVirtualized__Table__row"}>
                                            <Column label={"ID"} dataKey={"id"} width={50}/>
                                            <Column label={"Name"} dataKey={"name"} width={100}/>
                                            <Column label={"Phone"} dataKey={"phone"} width={100}/>
                                        </Table>
                                    }
                                </AutoSizer>
                            }
                        </WindowScroller>
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