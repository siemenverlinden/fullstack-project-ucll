import database from '../util/database';
import { Book } from '../model/book';



const getAllBooks = async (): Promise<Book[]> => {
    try {
        const booksPrisma = await database.book.findMany({

        });

        return booksPrisma.map((bookPrisma) => Book.from(bookPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error');
    }
};

const getBookById = async ({ id }: { id: string | undefined }): Promise<Book | null> => {

    if(id === undefined){
        throw new Error('Book id is undefined');
    }

    try {
        const bookPrisma = await database.book.findUnique({
            where: { id },
        });

        return bookPrisma ? Book.from(bookPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error');
    }
}


const createBook = async (book: Book): Promise<Book> => {
    try {
        const bookPrisma = await database.book.create({
           data: {
                title: book.getTitle(),
                authors: book.getAuthors(),
                isbn: book.getIsbn(),
            },
        });

        return Book.from(bookPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error.');
    }
};


export default {
    getAllBooks,
    createBook,
    getBookById
};