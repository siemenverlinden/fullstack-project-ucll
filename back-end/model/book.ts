import {
    Book as BooksPrisma,
} from '@prisma/client';

export class Book {

    private bookId?: string;
    private title: string;
    private description: string;
    private authors: string[];
    private isbn: string;
    private copiesCount?: number;


    constructor(book: {
        bookId?: string;
        title: string;
        description: string;
        authors: string[];
        isbn: string;
        copiesCount?: number;
    }) {

    this.bookId = book.bookId;
    this.title = book.title;
    this.description = book.description;
    this.authors = book.authors;
    this.isbn = book.isbn;
    this.copiesCount = book.copiesCount;
    }


    getBookId(): string | undefined {
        return this.bookId;
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
    getCopiesCount(): number | undefined {
        return this.copiesCount;
    }

    equals(book: Book): boolean {
        return (
            this.title === book.getTitle() &&
            this.description === book.getDescription() &&
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
            bookId: bookPrisma.bookId,
            title: bookPrisma.title,
            description: bookPrisma.description,
            authors: bookPrisma.authors,
            isbn: bookPrisma.isbn,
            copiesCount: bookPrisma.bookCopies?.length || 0, 
        });
    }

}
