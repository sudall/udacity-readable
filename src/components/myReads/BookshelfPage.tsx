import * as React from "react";
import BookshelfList from "src/components/myReads/BookshelfList";
import Bookshelf from "src/components/myReads/Bookshelf";
import Book from "src/components/myReads/Book";
import {RouteComponentProps} from "react-router";
import SearchPage from "src/components/myReads/SearchPage";
import BookshelfData from "src/data/models/BookshelfData";
import BookData from "src/data/models/BookData";

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
                                return <Book key={book.id} book={book} onUpdateBook={this.props.onUpdateBook}/>;
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
        onUpdateBook: (book: BookData, newBookshelfTitle: string) => void;
    }
}

export default BookshelfPage;