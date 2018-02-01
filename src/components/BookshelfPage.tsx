import * as React from "react";
import BookshelfList from "src/components/BookshelfList";
import Bookshelf from "src/components/Bookshelf";
import Book from "src/components/Book";
import BooksApp from "src/App";

class BookshelfPage extends React.Component {
    render() {
        return (
            <BookshelfList>
                {
                    BooksApp.bookshelves.map((bookshelf) => {
                        return (
                            <Bookshelf key={bookshelf.title} bookshelf={bookshelf}>
                                {
                                    bookshelf.books.map((book) => {
                                        return <Book key={book.title} book={book}/>;
                                    })
                                }
                            </Bookshelf>
                        );
                    })
                }
            </BookshelfList>
        )
    }
}

export default BookshelfPage;