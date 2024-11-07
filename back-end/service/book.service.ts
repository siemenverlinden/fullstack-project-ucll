import { Loan } from '../model/loan';
import { Book } from '../model/book';
import bookDb from '../repository/book.db';
import membersDb from "../repository/user.db";
import { v4 as uuidv4 } from 'uuid'; //generate unique id

import { BookInput } from '../types';

const getAllBooks = async (): Promise<Book[]> => bookDb.getAllBooks();

export default { getAllBooks };
