import {
    Book as BooksPrisma,
    User as UsersPrisma
} from '@prisma/client';
import {Book} from "./book";
import {User} from "./user";

export class BookCopy {

    public id: string;
    public book: Book;

    constructor(bookCopy: {
        id: string;
        book: Book;
    }) {
        this.id = bookCopy.id;
        this.book = bookCopy.book;
    }

    getId(): string {
        return this.id;
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
            book: Book.from(book)
        });
    }

}
