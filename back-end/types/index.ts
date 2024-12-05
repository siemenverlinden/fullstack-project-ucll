type Role = 'admin' | 'user';

type UserInput = {
    id? : string;
    email: string;
    password: string;
    role: Role;
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
    bookCopy: BookCopyInput;
    user: UserInput;
    borrowDate: Date;
    returnDate: Date;
}
type BookCopyInput= {
    id?: string;
    book: BookInput;
}

type AuthenticationResponse = {
    id: string;
    token: string;
    email: string;
    role: Role;
};

export {
    Role,
    UserInput,
    BookInput,
    LoanInput,
    AuthenticationResponse,
    BookCopyInput
};
