import * as React from "react";
import BookshelfData from "src/data/models/BookshelfData";
import Book from "src/components/Book";
import CustomComponentValidators from "src/CustomComponentValidators";
import {ReactNode} from "react";

interface IBookshelfProps {
    bookshelf: BookshelfData;
}

class Bookshelf extends React.Component<IBookshelfProps> {
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
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.bookshelf.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.mapChildrenToListItems()}
                    </ol>
                </div>
            </div>
        )
    }
}

Bookshelf["propTypes"] = {
    children: CustomComponentValidators.createChildrenTypesValidator([Book])
};

export default Bookshelf;