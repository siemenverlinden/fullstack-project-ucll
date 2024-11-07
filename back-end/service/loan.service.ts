import { Loan } from '../model/loan';
import { Book } from '../model/book';
import bookDb from '../repository/book.db';
import usersDb from "../repository/user.db";
import { v4 as uuidv4 } from 'uuid'; //generate unique id

import { LoanInput } from '../types';
import loanDb from "../repository/loan.db";

const getAllLoans = async (): Promise<Loan[]> => loanDb.getAllLoans();
export default {  getAllLoans };
