import CustomComponentValidators from "src/CustomComponentValidators";
import Bookshelf from "src/components/myReads/Bookshelf";
import * as React from "react";

class BookshelfList extends React.Component<BookshelfList.IProps> {
    static propTypes = {
        children: CustomComponentValidators.createChildrenTypesValidator([Bookshelf])
    };

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.props.children}
                    </div>
                </div>
                <div className="open-search">
                    <a onClick={this.props.onAddBook}>Add a book</a>
                </div>
            </div>
        );
    }
}

module BookshelfList {
    export interface IProps {
        onAddBook: () => void;
    }
}

export default BookshelfList;