export type Book = {
    bookId: string;
    title: string;
    description: string;
    authors: String[];
    isbn: string;
    copiesCount: number;
};

export type User = {
    userId: string;
    email: string;
}