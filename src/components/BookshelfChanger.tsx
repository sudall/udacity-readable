import * as React from "react";
import BooksApp from "src/App";
import Bookshelf from "src/components/Bookshelf";

class BookshelfChanger extends React.Component {
    render() {
        return (
            <div className="book-shelf-changer">
                <select>
                    <option value="none" disabled>Move to...</option>
                    {
                        BooksApp.KnownBookshelfTitles.map((title) => {
                            return (
                                <option key={title} value={title}>
                                {
                                    Bookshelf.calculateBookshelfDisplayTitle(title)
                                }
                                </option>
                            );
                        })
                    }
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default BookshelfChanger;