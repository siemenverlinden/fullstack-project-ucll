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
    id: string;
    email: string;
}

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};