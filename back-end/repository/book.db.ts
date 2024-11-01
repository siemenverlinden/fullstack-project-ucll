import { Book } from '../model/book';
import {v4 as uuidv4} from "uuid";

const books = [
    new Book({
        id:  uuidv4(),
        title: 'The Lord of the Rings',
        description: 'The Lord if the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.',
        authors: ['J. R. R. Tolkien'],
        isbn: '9780261102385',
        copiesAvailable: 5,
    }),
    new Book({
        id:  uuidv4(),
        title: 'Harry Potter and the Philosopher\'s Stone',
        description: 'Harry Potter and the Philosopher\'s Stone is a fantasy novel written by British author J. K. Rowling.',
        authors: ['J. K. Rowling'],
        isbn: '9780747532743',
        copiesAvailable: 3,
    }),
];

const getAllBooks = (): Book[] => books;

const getBookById = ({ id }: { id: string }): Book | null => {
    return books.find((book) => book.getId() === id) || null;
};

const getBookByIsbn = ({ isbn }: { isbn: string }): Book | null => {
    return books.find((book) => book.getIsbn() === isbn) || null;
}
const getBookByTitle = ({ title }: { title: string }): Book | null => {
    return books.find((book) => book.getTitle() === title) || null;
}
const getBookByAuthor = ({ author }: { author: string }): Book | null => {
    return books.find((book) => book.getAuthors().includes(author)) || null;
}

export default {
    getAllBooks,
    getBookById,
    getBookByIsbn,
    getBookByTitle,
    getBookByAuthor,
};