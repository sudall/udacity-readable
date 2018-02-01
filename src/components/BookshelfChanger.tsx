import * as React from "react";
import BooksApp from "src/App";
import Bookshelf from "src/components/Bookshelf";
import BookData from "src/data/models/BookData";
import BookConnector from "src/data/connectors/BookConnector";

class BookshelfChanger extends React.Component<BookshelfChanger.IProps> {
    private isBookshelfOptionSelected(book: BookData, bookshelfOptionValue: string) {
        return book.shelf === bookshelfOptionValue;
    }

    private getAllBookshelfTitleOptions() {
        return BooksApp.BookshelfTitlesToDisplay.concat(BooksApp.NoneBookshelfTitle);
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select onChange={
                    (event) => {
                        this.props.onChangeBookshelf(event.target.value);
                    }
                }>
                    <option disabled>Move to...</option>
                    {
                        this.getAllBookshelfTitleOptions().map((title) => {
                            return (
                                <option key={title} value={title} selected={this.isBookshelfOptionSelected(this.props.book, title)}>
                                {
                                    Bookshelf.calculateBookshelfDisplayTitle(title)
                                }
                                </option>
                            );
                        })
                    }
                </select>
            </div>
        )
    }
}

module BookshelfChanger {
    export interface IProps {
        book: BookData;
        onChangeBookshelf: (newBookshelfTitle: string) => void;
    }
}

export default BookshelfChanger;