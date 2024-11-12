import { Loan } from '../model/loan';
import { Book } from '../model/book';
import membersDb from "../repository/user.db";
import { v4 as uuidv4 } from 'uuid'; //generate unique id

import { BookInput } from '../types';
import bookCopyDb from "../repository/bookCopy.db";
import {BookCopy} from "@prisma/client";


const getAvailableCopiesByBookId = async (id: string): Promise<BookCopy[] | null> => bookCopyDb.getAvailableCopiesByBookId(id);
const getLoanedCopiesByBookId = async (id: string): Promise<BookCopy[]  | null> => bookCopyDb.getLoanedCopiesByBookId(id);
export default { getAvailableCopiesByBookId,getLoanedCopiesByBookId };