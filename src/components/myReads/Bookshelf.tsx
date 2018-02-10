import * as React from "react";
import BookshelfData from "src/data/models/BookshelfData";
import BooksGrid from "src/components/myReads/BooksGrid";

class Bookshelf extends React.Component<Bookshelf.IProps> {
    public static calculateBookshelfDisplayTitle(shelfTitle: string) {
        let result = shelfTitle.replace(/([A-Z])/g, " $1");

        result = `${result.charAt(0).toUpperCase()}${result.slice(1)}`;

        return result;
    }

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{Bookshelf.calculateBookshelfDisplayTitle(this.props.bookshelf.title)}</h2>
                <div className="bookshelf-books">
                    <BooksGrid>
                        {this.props.children}
                    </BooksGrid>
                </div>
            </div>
        )
    }
}

module Bookshelf {
    export interface IProps {
        bookshelf: BookshelfData;
    }
}

export default Bookshelf;