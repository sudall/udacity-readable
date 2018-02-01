import * as BooksAPI from "src/BooksAPI";
import BookData from "src/data/models/BookData";
import {Observable} from "rxjs";


class BookConnector {
    static instance: BookConnector = new BookConnector();

    getAllBooks(): Observable<BookData[]> {
        return Observable.fromPromise(BooksAPI.getAll());
    }
}

export default BookConnector;