import { User } from './user';
import { Book } from './book';

export class Loan {

    private id?: string;
    private book: Book;
    private user: User;
    private borrowDate: Date;
    private returnDate: Date;


    constructor(loan: {
        id?: string;
        book: Book;
        user: User;
        borrowDate: Date;
        returnDate: Date;
    }) {

        this.id = loan.id;
        this.book = loan.book;
        this.user = loan.user;
        this.borrowDate = loan.borrowDate;
        this.returnDate = loan.returnDate;
    }

    getReturnDate(): Date {
        return this.returnDate;
    }
    getBorrowDate(): Date {
        return this.borrowDate;
    }
    getUser(): User {
        return this.user;
    }
    getBook(): Book {
        return this.book;
    }

    getId(): string | undefined {
        return this.id;
    }

    equals(loan: Loan): boolean {
        return (
            this.id === loan.getId() &&
            this.user.equals(loan.getUser()) &&
            this.book.equals(loan.getBook()) &&
            this.borrowDate === loan.getBorrowDate() &&
            this.returnDate === loan.getReturnDate()
        );
    }

}
