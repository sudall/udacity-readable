class BookData {
    id: string;
    title?: string;
    authors?: string[];
    imageLinks?: {
        smallThumbnail: string;
        thumbnail: string;
    };
    shelf?: string;
}

export default BookData;