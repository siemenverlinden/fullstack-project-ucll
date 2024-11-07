import { User } from './user';
import {Book} from "./book";
import {
    Loan as LoanPrisma,
    User as UserPrisma,
    Book as BookPrisma,
} from '@prisma/client';


export class Loan {
    private loanId?: string;
    private book: Book;
    private user: User;
    private borrowDate: Date;
    private returnDate?: Date;

    constructor(loan: {
        loanId?: string;
        book: Book;
        user: User;
        borrowDate: Date;
        returnDate?: Date;
    }) {
        this.loanId = loan.loanId;
        this.book = loan.book;
        this.user = loan.user;
        this.borrowDate = loan.borrowDate;
        this.returnDate = loan.returnDate;
    }

    // Getter-methoden
    getLoanId(): string | undefined {
        return this.loanId;
    }

    getBook(): Book {
        return this.book;
    }

    getUser(): User {
        return this.user;
    }

    getBorrowDate(): Date {
        return this.borrowDate;
    }

    getReturnDate(): Date | undefined {
        return this.returnDate;
    }

    // Vergelijkingsmethode
    equals(loan: Loan): boolean {
        return (
            this.loanId === loan.getLoanId() &&
            this.user.equals(loan.getUser()) &&
            this.book.equals(loan.getBook()) &&
            this.borrowDate.getTime() === loan.getBorrowDate().getTime() &&
            ((this.returnDate && loan.getReturnDate() && this.returnDate.getTime() === loan.getReturnDate()!.getTime()) ||
                (!this.returnDate && !loan.getReturnDate()))
        );
    }


    static from({
                    loanId,
                    book,
                    user,
                    borrowDate,
                }: LoanPrisma & {
        book: BookPrisma;
        user: UserPrisma;
    }) {
        return new Loan({
            loanId,
            book: Book.from(book),
            user: User.from(user),
            borrowDate,
        });

    }

}
