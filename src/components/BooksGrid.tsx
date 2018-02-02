import * as React from "react";
import {ReactNode} from "react";

class BooksGrid extends React.Component {
    private mapChildrenToListItems() {
        return React.Children.map<ReactNode>(this.props.children, (child) => {
            return (
                <li>
                    {child}
                </li>
            );
        });
    }

    render() {
        return (
            <ol className="books-grid">
                {this.mapChildrenToListItems()}
            </ol>
        );
    }
}

export default BooksGrid;