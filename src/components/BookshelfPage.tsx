import * as React from "react";
import BookshelfList from "src/components/BookshelfList";
import Bookshelf from "src/components/Bookshelf";
import Book from "src/components/Book";
import {RouteComponentProps} from "react-router";
import SearchPage from "src/components/SearchPage";
import BookshelfData from "src/data/models/BookshelfData";

class BookshelfPage extends React.Component<BookshelfPage.IProps> {
    static getRoutePath(): string {
        return "/";
    }

    render() {
        return (
            <BookshelfList onAddBook={() => {this.props.history.push(SearchPage.getRoutePath())}}>
            {
                this.props.bookshelves.map((bookshelf) => {
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

module BookshelfPage {
    export interface IProps extends RouteComponentProps<IProps> {
        bookshelves: BookshelfData[];
    }
}

export default BookshelfPage;