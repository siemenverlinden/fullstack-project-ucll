type Role = 'admin' | 'user';

export type Book = {
    id?: string;
    title: string;
    authors: String;
    isbn: string;
    copies: number;
};

export type BookCopy = {
    id: string;
    book: Book;
};

export type User = {
    id?: string;
    email?: string;
    password?: string;
    role?: Role;
}

export type Loan = {
    id: string;
    bookCopy: BookCopy;
    user: User;
    loanDate: Date;
    returnDate: Date;
}
export type StatusMessage = {
    message: string;
    type: "error" | "success";
};