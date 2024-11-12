import {
    Book as BooksPrisma,
    User as UsersPrisma
} from '@prisma/client';
import {Book} from "./book";
import {User} from "./user";

export class BookCopy {

    public id: string;
    public book: Book;
    public bookId: string;

    constructor(bookCopy: {
        id: string;
        book: Book;
        bookId: string;
    }) {
        this.id = bookCopy.id;
        this.book = bookCopy.book;
        this.bookId = bookCopy.bookId;
    }

    getId(): string {
        return this.id;
    }

getBookId(): string {
        return this.bookId;
}

    getBook(): Book {
        return this.book;
    }
    equals(bookCopy: BookCopy): boolean {
        return (
            this.id === bookCopy.getId() &&
            this.book === bookCopy.getBook()
        );
    }

    static from({ id, book }: { id: string, book: BooksPrisma }): BookCopy {
        return new BookCopy({
            id: id,
            book: Book.from(book) ,
            bookId: book.id,
        });
    }

}
