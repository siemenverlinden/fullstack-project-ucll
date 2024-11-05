import {
    Book as BooksPrisma,
} from '@prisma/client';

export class Book {

    private bookId?: string;
    private title: string;
    private description: string;
    private authors: string[];
    private isbn: string;
    private totalCopies: number;



    constructor(book: {
        bookId?: string;
        title: string;
        description: string;
        authors: string[];
        isbn: string;
        totalCopies: number;
    }) {

    this.bookId = book.bookId;
    this.title = book.title;
    this.description = book.description;
    this.authors = book.authors;
    this.isbn = book.isbn;
    this.totalCopies = book.totalCopies;
    }


    getBookId(): string | undefined {
        return this.bookId;
    }

    getTotalCopies(): number {
        return this.totalCopies;
    }
    getIsbn(): string {
        return this.isbn;
    }
    getAuthors(): string[] {
        return this.authors;
    }
    getDescription(): string {
        return this.description;
    }
    getTitle(): string {
        return this.title;
    }

    equals(book: Book): boolean {
        return (
            this.title === book.getTitle() &&
            this.description === book.getDescription() &&
            this.authors === book.getAuthors() &&
            this.isbn === book.getIsbn()
        );
    }
    static from({
        bookId,
        title,
        description,
        authors,
        isbn,
                    totalCopies,
    }: BooksPrisma ) {
        return new Book({
                bookId,
                title,
                description,
                authors,
                isbn,
            totalCopies,
            }
        );
    }
}
