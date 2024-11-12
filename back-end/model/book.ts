import {
    Book as BooksPrisma,
} from '@prisma/client';

export class Book {

    private id?: string;
    private title: string;
    private authors: string;
    private isbn: string;


    constructor(book: {
        id?: string;
        title: string;
        authors: string;
        isbn: string;
    }) {

    this.id = book.id;
    this.title = book.title;
    this.authors = book.authors;
    this.isbn = book.isbn;
    }


    getId(): string | undefined {
        return this.id;
    }

    getIsbn(): string {
        return this.isbn;
    }
    getAuthors(): string {
        return this.authors;
    }
    getTitle(): string {
        return this.title;
    }


    equals(book: Book): boolean {
        return (
            this.title === book.getTitle() &&
            this.authors === book.getAuthors() &&
            this.isbn === book.getIsbn()
        );
    }


    /**
     * Type van de parameter in de from methode veranderen naar any
     *
     * @param bookPrisma
     */
    static from(bookPrisma: any): Book {
        return new Book({
            id: bookPrisma.id,
            title: bookPrisma.title,
            authors: bookPrisma.authors,
            isbn: bookPrisma.isbn,
        });
    }

}
