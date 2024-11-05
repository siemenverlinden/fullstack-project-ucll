import {Book} from "../model/book";
import {User} from "../model/user";

type Role = 'admin' | 'member' | 'buyer';

type UserInput = {
    userId?: string;
    email: string;
    password: string;
    createdAt: Date;
}

type BookInput = {
    bookId?: string;
    title: string;
    description: string;
    authors: string[];
    isbn: string;
    copiesAvailable: number;

}
type LoanInput = {
    loanId?: string;
    book: BookInput;
    user: UserInput;
    borrowDate: Date;
    returnDate: Date;
}
export {
    Role,
    UserInput,
    BookInput,
    LoanInput
};
