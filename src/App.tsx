import "src/App.css";
import * as React from "react";
import BookData from "src/data/models/BookData";
import BookshelfData from "src/data/models/BookshelfData";
import SearchPage from "src/components/SearchPage";
import BookshelfPage from "src/components/BookshelfPage"
import BookConnector from "src/data/connectors/BookConnector";

class BooksApp extends React.Component {
    state = new BooksApp.State();

    static books: BookData[] = [
        {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            imageUrl: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
            id: "someId"
        }
    ];

    static bookshelves: BookshelfData[] = [
        {
            title: "Currently Reading",
            books: [
                BooksApp.books[0]
            ]
        },
        {
            title: "Want to Read",
            books: []
        },
        {
            title: "Read",
            books: []
        }
    ];

    private buildBookshelves(books: BookData[]) {
        let bookshelfNameToBookshelfMap = new Map<string, BookshelfData>();

        books.forEach((book) => {
            // bookshelfNameToBookshelfMap.get(book.);
        });
    }

    componentDidMount() {
        BookConnector.instance.getAllBooks()
            .subscribe((books) => {
                let bookshelves = this.buildBookshelves(books);

                this.setState({
                    books: books,
                    bookshelves: bookshelves
                });
            });
    }

    render() {
        return (
            <div className="app">
                {this.state.showSearchPage ?
                    <SearchPage/>
                    :
                    <BookshelfPage/>
                }
            </div>
        );
    }
}

module BooksApp {
    export class State {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: boolean = false;

        books: BookData[] = [];

        bookshelves: BookshelfData[] = [];
    }
}

export default BooksApp;
