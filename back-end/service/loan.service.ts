import { Loan } from '../model/loan';
import { Book } from '../model/book';
import bookDb from '../repository/book.db';
import usersDb from "../repository/user.db";
import { v4 as uuidv4 } from 'uuid'; //generate unique id

import { Role } from '../types';
import loanDb from "../repository/loan.db";
import {UnauthorizedError} from "express-jwt";
import bookCopyDb from "../repository/bookCopy.db";
import {BookCopy} from "../model/bookCopy";

const getLoanById = async (id: string): Promise<Loan | null> => {
    return loanDb.getLoanById(id);
}


const getAllLoans = async ({
                               id,
                               email,
                               role,
                           }: {
    id: string;
    email: string;
    role: Role;
}): Promise<Loan[]> => {
    if (role === 'admin') {
        return    loanDb.getAllLoans();
    } else if (role === 'user') {
       return  loanDb.getAllLoansByUserId(id)
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resourcell.',
        });
    }
};

const deleteLoan = async (id: string): Promise<void> => {
    return loanDb.deleteLoan(id);
}
const createLoan = async ({
                                bookCopyId,
                                userId,
                            }: {
        bookCopyId: string;
        userId: string;
    }): Promise<Loan> => {


        const user = await usersDb.getUserById(userId);
        if (user === null) {
            throw new Error('User not found.');
        }

        const bookCopy = await bookCopyDb.getBookCopyById(bookCopyId);
        if(bookCopy === null){
            throw new Error('BookCopy not found.');
        }
    const loan = new Loan({
        bookCopy: bookCopy,
        user,
        borrowDate: new Date(),
        dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
    });
        return await loanDb.createLoan(loan);
}

export default {  getAllLoans,getLoanById,deleteLoan,createLoan };
