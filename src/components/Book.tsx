import * as React from "react";
import BookData from "src/data/models/BookData";
import BookshelfChanger from "src/components/BookshelfChanger";
import BookConnector from "src/data/connectors/BookConnector";

class Book extends React.Component<Book.IProps> {
    private static getSmallThumbnailUrl(book: BookData) {
        let result: string = "";
        if (book.imageLinks) {
            result = book.imageLinks.smallThumbnail;
        }
        return result;
    }

    private static getAuthors(book: BookData) {
        let result: JSX.Element[] = [];

        if (book.authors) {
            result = book.authors.map((author, index) => {
                return <span>{index > 0 ? <br/> : ""}{author}</span>;
            });
        }

        return result;
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                         style={{width: 128, height: 193, backgroundImage: `url("${Book.getSmallThumbnailUrl(this.props.book)}")`}}/>
                    <BookshelfChanger book={this.props.book} onChangeBookshelf={
                        (newBookshelfTitle) => {
                            this.props.onUpdateBook(this.props.book, newBookshelfTitle);
                        }
                    }/>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{Book.getAuthors(this.props.book)}</div>
            </div>
        )
    }
}

module Book {
    export interface IProps {
        book: BookData,
        onUpdateBook(book: BookData, newBookshelfTitle: string): void;
    }
}

export default Book;