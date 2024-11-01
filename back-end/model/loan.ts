import { Member } from './member';
import { Book } from './book';

export class Loan {

    private id?: string;
    private book: Book;
    private member: Member;
    private borrowDate: Date;
    private returnDate: Date;


    constructor(loan: {
        id?: string;
        book: Book;
        member: Member;
        borrowDate: Date;
        returnDate: Date;
    }) {

        this.id = loan.id;
        this.book = loan.book;
        this.member = loan.member;
        this.borrowDate = loan.borrowDate;
        this.returnDate = loan.returnDate;
    }

    getReturnDate(): Date {
        return this.returnDate;
    }
    getBorrowDate(): Date {
        return this.borrowDate;
    }
    getMember(): Member {
        return this.member;
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
            this.member.equals(loan.getMember()) &&
            this.book.equals(loan.getBook()) &&
            this.borrowDate === loan.getBorrowDate() &&
            this.returnDate === loan.getReturnDate()
        );
    }

}
