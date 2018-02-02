import * as BooksAPI from "src/BooksAPI";
import BookData from "src/data/models/BookData";
import {Observable} from "rxjs";


class BookConnector {
    static getAllBooks(): Observable<BookData[]> {
        return Observable.fromPromise(BooksAPI.getAll());
    }

    static updateBook(book: BookData, bookshelfTitle: string): Observable<void> {
        // if the titles are different...
        if (book.title !== bookshelfTitle) {
            // make the update call
            return Observable.fromPromise(BooksAPI.update(book, bookshelfTitle));
        }

        // otherwise, don't bother. just complete the observable
        return Observable.empty();
    }

    static search(query: string): Observable<BookData[]> {
        // if the query isn't null or empty
        if (query != null && query != "") {
            // do the search
            return Observable.fromPromise(BooksAPI.search(query))
                .map((searchResults) => {
                    if (!Array.isArray(searchResults)) {
                        return [];
                    }

                    return searchResults;
                });
        }

        // otherwise don't bother. just complete the observable
        return Observable.empty();
    }
}

export default BookConnector;