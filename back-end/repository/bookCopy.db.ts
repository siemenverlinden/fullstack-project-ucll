import database from '../util/database';
import { Book } from '../model/book';
import { BookCopy } from '../model/bookCopy';



const createBookCopy = async ( book: Book, copies: number ): Promise<void> => {
console.log(copies)


    for (let i = 0; i < Number(copies); i++) {
console.log( book.getId())
       await database.bookCopy.create({
            data: {
                book: {
                    connect: { id: book.getId() },
                },
            },
        })
    }


    // try {
    //     await database.bookCopy.createMany({
    //         data: bookCop,
    //     });
    // } catch (error) {
    //     console.error(error);
    //     throw new Error('Database error. See server log for details.');
    // }
}




const getAvailableCopiesByBookId = async (bookId: string): Promise<BookCopy[]> => {
    try {
        const copies = await database.bookCopy.findMany({
            include: {
                book: true,
            },
            where: {
                bookId,
                loan: null,
            },
        });
        return copies.map((copy) => BookCopy.from(copy));
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

export default {
    getAvailableCopiesByBookId,
    createBookCopy,
    getLoanedCopiesByBookId
};
