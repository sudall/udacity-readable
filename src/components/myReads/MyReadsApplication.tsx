import "src/App.css";
import * as React from "react";
import BookData from "src/data/models/BookData";
import BookshelfData from "src/data/models/BookshelfData";
import SearchPage from "src/components/myReads/SearchPage";
import BookshelfPage from "src/components/myReads/BookshelfPage"
import BookConnector from "src/data/connectors/BookConnector";
import {Route} from "react-router";
import {History} from "history";

class MyReadsApplication extends React.Component {
    state = new MyReadsApplication.State();

    static readonly BookshelfTitlesToDisplay: string[] = ["currentlyReading", "wantToRead", "read"];
    static readonly NoneBookshelfTitle = "none";

    private buildBookshelves(books: BookData[]): BookshelfData[] {
        const bookshelfTitleToBookshelfMap = new Map<string, BookshelfData>();

        books.forEach((book) => {
            const shelfTitle = book.shelf || "unknown";

            let shelfData = bookshelfTitleToBookshelfMap.get(shelfTitle);
            if (shelfData == null) {
                shelfData = new BookshelfData();
                shelfData.title = shelfTitle;
                bookshelfTitleToBookshelfMap.set(shelfTitle, shelfData);
            }

            shelfData.books.push(book);
        });

        // get the known bookshelves that we want to display
        const bookshelves = MyReadsApplication.BookshelfTitlesToDisplay.map((title) => {
            let bookshelf = bookshelfTitleToBookshelfMap.get(title);

            if (bookshelf == null) {
                bookshelf = new BookshelfData();
                bookshelf.title = title;
            }

            return bookshelf;
        });

        // sort by the known order
        bookshelves.sort((item1, item2) => {
            const item1Index = MyReadsApplication.BookshelfTitlesToDisplay.indexOf(item1.title);
            const item2Index = MyReadsApplication.BookshelfTitlesToDisplay.indexOf(item2.title);
            return item1Index - item2Index;
        });

        return bookshelves;
    }

    private updateBook = (book: BookData, bookshelfTitle: string) => {
        BookConnector.updateBook(book, bookshelfTitle)
            .subscribe(() => {
                this.setState((previousState: MyReadsApplication.State) => {
                    // update this book
                    book.shelf = bookshelfTitle;

                    const bookMatch = previousState.books
                    .find((previousStateBook) => {
                        return previousStateBook.id === book.id;
                    });

                    // if the book is not already in a shelf...
                    if (bookMatch == null) {
                        // add it to the shelved books list
                        previousState.books.push(book);
                    } else {
                        // if the new bookshelf is none...
                        if (bookshelfTitle === MyReadsApplication.NoneBookshelfTitle) {
                            // remove the book from the shelved books list
                            previousState.books = previousState.books.filter((previousStateBook) => {
                                return book.id !== previousStateBook.id;
                            });
                        }
                    }

                    return {
                        books: previousState.books
                    };
                })
            });
    };

    private getFullBookData = (bookId: string) => {
        return this.state.books
            .find((book) => {
                return book.id === bookId;
            });
    };

    componentDidMount() {
        BookConnector.getAllBooks()
            .subscribe((books) => {
                this.setState({
                    books: books,
                });
            });
    }

    private static onSearchPageClose(history: History) {
        history.push(BookshelfPage.getRoutePath());
    }

    render() {
        return (
            <div className="app">
                <Route path={BookshelfPage.getRoutePath()} exact render={
                    (props) => {
                        return <BookshelfPage bookshelves={this.buildBookshelves(this.state.books)}
                                              onUpdateBook={this.updateBook}
                                              {...props} />
                    }
                }/>
                <Route path={SearchPage.getRoutePath()} render={
                    ({history}) => {
                        return <SearchPage onClose={() => { MyReadsApplication.onSearchPageClose(history); }}
                                           onUpdateBook={this.updateBook}
                                           onGetFullBookData={this.getFullBookData}/>
                    }
                }/>
            </div>
        );
    }
}

module MyReadsApplication {
    export class State {
        books: BookData[] = [];
    }
}

export default MyReadsApplication;
