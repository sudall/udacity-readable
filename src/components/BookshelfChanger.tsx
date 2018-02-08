import * as React from "react";

import Bookshelf from "src/components/Bookshelf";
import BookData from "src/data/models/BookData";
import MyReadsApplication from "src/components/MyReadsApplication";

class BookshelfChanger extends React.Component<BookshelfChanger.IProps> {
    private static getAllBookshelfTitleOptions() {
        return MyReadsApplication.BookshelfTitlesToDisplay.concat(MyReadsApplication.NoneBookshelfTitle);
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.props.book.shelf} onChange={
                    (event) => {
                        this.props.onChangeBookshelf(event.target.value);
                    }
                }>
                    <option disabled>Move to...</option>
                    {
                        BookshelfChanger.getAllBookshelfTitleOptions()
                            .map((title) => {
                                return (
                                    <option key={title} value={title}>
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