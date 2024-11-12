import { User } from './user';
import {BookCopy} from "./bookCopy";
import {
    Loan as LoanPrisma,
    User as UserPrisma,
    BookCopy as BookCopyPrisma,
    Book as BooksPrisma
} from '@prisma/client';


export class Loan {
    private id?: string;
    private bookCopy: BookCopy;
    private user: User;
    private borrowDate: Date;
    private returnDate?: Date;

    constructor(loan: {
        id?: string;
        bookCopy: BookCopy;
        user: User;
        borrowDate: Date;
        returnDate?: Date;
    }) {
        this.id = loan.id;
        this.bookCopy = loan.bookCopy;
        this.user = loan.user;
        this.borrowDate = loan.borrowDate;
        this.returnDate = loan.returnDate;
    }

    // Getter-methoden
    getId(): string | undefined {
        return this.id;
    }

    getBookCopy(): BookCopy {
        return this.bookCopy;
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
            this.id === loan.getId() &&
            this.user.equals(loan.getUser()) &&
            this.bookCopy.equals(loan.getBookCopy()) &&
            this.borrowDate.getTime() === loan.getBorrowDate().getTime() &&
            ((this.returnDate && loan.getReturnDate() && this.returnDate.getTime() === loan.getReturnDate()!.getTime()) ||
                (!this.returnDate && !loan.getReturnDate()))
        );
    }

    static from({ id, bookCopy, user, borrowDate }: LoanPrisma & { user: UserPrisma, bookCopy: BookCopyPrisma & { book: BooksPrisma }  }) {
        return new Loan({
            id,
            bookCopy: BookCopy.from(bookCopy),
            user: User.from(user),
            borrowDate,
        });

    }
}
