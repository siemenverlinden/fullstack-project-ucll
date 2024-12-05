import { User } from './user';
import {BookCopy} from "./bookCopy";
import {
    Loan as LoanPrisma,
    User as UserPrisma,
    BookCopy as BookCopyPrisma,
    Book as BooksPrisma
} from '@prisma/client';


export class Loan {
    id?: string;
    private bookCopy: BookCopy;
    user: User;
    private borrowDate: Date;
    private dueDate: Date ;

    constructor(loan: {
        id?: string;
        bookCopy: BookCopy;
        user: User;
        borrowDate: Date;
        dueDate: Date;
    }) {
        this.id = loan.id;
        this.bookCopy = loan.bookCopy;
        this.user = loan.user;
        this.borrowDate = loan.borrowDate;
        this.dueDate = loan.dueDate;
    }

    getDueDate(): Date {
        return this.dueDate;
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



    // Vergelijkingsmethode
    equals(loan: Loan): boolean {
        return (
            this.id === loan.getId() &&
            this.user.equals(loan.getUser()) &&
            this.bookCopy.equals(loan.getBookCopy()) &&
            this.borrowDate.getTime() === loan.getBorrowDate().getTime()
        );
    }

    static from({ id, bookCopy, user, borrowDate, dueDate }: LoanPrisma & { user: UserPrisma, bookCopy: BookCopyPrisma & { book: BooksPrisma }  }) {
        return new Loan({
            id,
            bookCopy: BookCopy.from(bookCopy),
            user: User.from(user),
            borrowDate,
            dueDate: dueDate
        });

    }
}
