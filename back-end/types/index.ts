import {Book} from "../model/book";
import {User} from "../model/user";

type Role = 'admin' | 'member' | 'buyer';

type UserInput = {
    id?: string;
    email: string;
    password: string;
    role: Role;
    created_at: Date;
}

type MemberInput = {
    id?: string;
    user: UserInput;
    phone: string;
}

type BookInput = {
    id?: string;
    title: string;
    description: string;
    authors: string[];
    isbn: string;
    copiesAvailable: number;

}
type LoanInput = {
    id?: string;
    book: BookInput;
    member: MemberInput;
    borrowDate: Date;
    returnDate: Date;
}
export {
    Role,
    UserInput,
    MemberInput,
    BookInput,
    LoanInput
};
