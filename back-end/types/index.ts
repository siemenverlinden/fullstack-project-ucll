import {Book} from "../model/book";
import {User} from "../model/user";

type Role = 'admin' | 'member' | 'buyer';

type UserInput = {
    id?: string;
    email: string;
    password: string;
    createdAt: Date;
}

type BookInput = {
    id?: string;
    title: string;
    authors: string;
    isbn: string;
    copies: number;

}
type LoanInput = {
    id?: string;
    book: BookInput;
    user: UserInput;
    borrowDate: Date;
    returnDate: Date;
}
type BookCopyInput= {
    id?: string;
    book: BookInput;
}
export {
    Role,
    UserInput,
    BookInput,
    LoanInput
};
