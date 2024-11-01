import { Loan } from '../model/loan';
import { Book } from '../model/book';
import bookDb from '../repository/book.db';
import membersDb from "../repository/members.db";
import { v4 as uuidv4 } from 'uuid'; //generate unique id

import { LoanInput } from '../types';
import loanDb from "../repository/loan.db";

const createLoan = ({
    book: bookInput,
    member: memberInput,
    borrowDate,
    returnDate,
}: LoanInput): Loan => {
    if (!bookInput.id) throw new Error('Book id is required');
    if (!memberInput.id) throw new Error('Member id is required');

    if (!borrowDate) {
        borrowDate = new Date(); // default to today
    }

    const book = bookDb.getBookById({ id: bookInput.id });
    const member = membersDb.getMemberById({ id: memberInput.id });



    if (!book) throw new Error('Book not found');
    if (!member) throw new Error('Member not found');


    if(!checkBookAvailability(book)) {
        throw new Error('Book is not available');

    }
    returnDate = returnDate || new Date(borrowDate.getTime() + 14 * 24 * 60 * 60 * 1000); // default to 14 days later
    const loanId = uuidv4();
    const newLoan = new Loan({ id: loanId, book, member, borrowDate, returnDate });
    return loanDb.createLoan(newLoan);


};

const deleteLoan = (id: string): void => {
  if(!id) throw new Error('Book id is required');
}

const checkBookAvailability = (book: Book): boolean => {
     const bookId = book.getId();
    const loans = loanDb.getLoansByBook(book)
    return loans.length >= book.getCopiesAvailable();

}
const getAllLoans = (): Loan[] => loanDb.getAllLoans();

export default { createLoan, deleteLoan, getAllLoans };
