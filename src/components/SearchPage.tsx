import * as React from "react";
import BooksGrid from "src/components/BooksGrid";
import BookData from "src/data/models/BookData";
import BookConnector from "src/data/connectors/BookConnector";
import Book from "src/components/Book";
import {Subject, Subscription} from "rxjs";

class SearchPage extends React.Component<SearchPage.IProps, SearchPage.State> {
    private searchInputOnChangeSubject: Subject<string> = new Subject<string>();
    private subscriptionsToDispose: Subscription[] = [];

    constructor(props: SearchPage.IProps) {
        super(props);

        this.state = new SearchPage.State();
    }

    componentWillMount() {
        // setup the onChange subscription
        let subscription = this.searchInputOnChangeSubject
            .debounceTime(500)
            .map((query) => {
                return BookConnector.search(query);
            })
            .switch<BookData[]>()
            .subscribe((searchResults) => {
                this.setSearchResults(searchResults);
            });

        this.subscriptionsToDispose.push(subscription);
    }

    componentWillUnmount() {
        this.subscriptionsToDispose.forEach((subscription) => {
            subscription.unsubscribe();
        });

        this.subscriptionsToDispose = [];
    }

    private setSearchResults(searchResults: BookData[]) {
        this.setState({
            searchResults: searchResults
        });
    }

    static getRoutePath() {
        return "/search";
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={this.props.onClose}>Close</a>
                    <div className="search-books-input-wrapper">
                        {/*
                          NOTES: The search from BooksAPI is limited to a particular set of search terms.
                          You can find these search terms here:
                          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                          you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text" placeholder="Search by title or author" onChange={(event) => {
                            this.searchInputOnChangeSubject.next(event.target.value);
                        }}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid>
                    {
                        this.state.searchResults.map((book) => {
                            return <Book book={book} onUpdateBook={this.props.onUpdateBook} />
                        })
                    }
                    </BooksGrid>
                </div>
            </div>
        );
    }
}

module SearchPage {
    export interface IProps {
        onClose: () => void;
        onUpdateBook(book: BookData, newBookshelfTitle: string): void;
    }

    export class State {
        searchResults: BookData[] = [];
    }
}

export default SearchPage;