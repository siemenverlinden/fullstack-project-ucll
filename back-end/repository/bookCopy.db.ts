import database from '../util/database';
import { Book } from '../model/book';
import { BookCopy } from '../model/bookCopy';
import {Loan} from "../model/loan";

const createBookCopy = async (bookId: string): Promise<void> => {
    try {
        const book = await database.book.findUnique({
            where: {
                id: bookId,
            },
        });

        if (!book) {
            throw new Error('Book not found.');
        }

        const bookCopy = await database.bookCopy.create({
            data: {
                bookId: bookId,
            },
            include: {
                book: true,
            },
        });


    } catch (error) {
        console.error(error);
        throw new Error('Failed to create book copy.');
    }
}



const getAvailableCopiesByBookId = async (id: string): Promise<BookCopy[]> => {
    try {
        const copiesPrisma = await database.bookCopy.findMany({
            include: {
                book: true,
            },
            where: {
                loan: null,
                bookId: id,
            },
        });

        return copiesPrisma.map((copyPrisma) => BookCopy.from(copyPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch available copies.');
    }
};

const getLoanedCopiesByBookId = async (bookId: string): Promise<BookCopy[]> => {
    try {
        const copies = await database.bookCopy.findMany({
            include: {
                book: true,
            },
            where: {
                bookId: bookId,
                loan: {
                    isNot: null,
                },
            },

        });
        return copies.map((copy) => BookCopy.from(copy));
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch available copies.');
    }
}
const getBookCopyById = async (id: string): Promise<BookCopy | null> => {
    try {
        const copy = await database.bookCopy.findUnique({
            where: {
                id: id,
            },
            include: {
                book: true,
            },
        });
        return copy ? BookCopy.from(copy) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch book copy.');
    }
}


export default {
    getAvailableCopiesByBookId,
    createBookCopy,
    getLoanedCopiesByBookId,
    getBookCopyById,
};
