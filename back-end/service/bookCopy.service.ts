import bookCopyDb from "../repository/bookCopy.db";
import {BookCopy} from "@prisma/client";


// @ts-ignore
const getAvailableCopiesByBookId = async (id: string): Promise<BookCopy[]> => bookCopyDb.getAvailableCopiesByBookId(id);
// @ts-ignore
const getLoanedCopiesByBookId = async (id: string): Promise<BookCopy[]> => bookCopyDb.getLoanedCopiesByBookId(id);
// @ts-ignore
const getBookCopyById = async (id: string): Promise<BookCopy | null> => bookCopyDb.getBookCopyById(id);

const createBookCopy = async (id: string): Promise<void> => bookCopyDb.createBookCopy(id);

export default { getAvailableCopiesByBookId,getLoanedCopiesByBookId,getBookCopyById,createBookCopy };