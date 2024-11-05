import database from '../util/database';
import { Book } from '../model/book';



const getAllBooks = async (): Promise<Book[]> => {
    try {
        const booksPrisma = await database.book.findMany({
        });
        return booksPrisma.map((bookPrisma  ) => Book.from(bookPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getBookById = async (bookId: string): Promise<Book | null> => {
    try {
        const bookPrisma = await database.book.findUnique({
            where: {
                bookId: bookId
            }
        });
        return bookPrisma ? Book.from(bookPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllBooks,
    getBookById
};