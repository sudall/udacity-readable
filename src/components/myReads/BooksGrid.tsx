import * as React from "react";
import {ReactNode} from "react";
import Book from "src/components/myReads/Book";
import CustomComponentValidators from "src/CustomComponentValidators";

class BooksGrid extends React.Component {
    static propTypes = {
        children: CustomComponentValidators.createChildrenTypesValidator([Book])
    };

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