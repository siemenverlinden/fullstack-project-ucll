import { Loan } from '../model/loan';
import { Book } from '../model/book';
import bookDb from '../repository/book.db';
import usersDb from "../repository/user.db";
import { v4 as uuidv4 } from 'uuid'; //generate unique id

import { LoanInput } from '../types';
import loanDb from "../repository/loan.db";
//
// const createLoan = ({
//     book: bookInput,
//     user: userInput,
//     borrowDate,
//     returnDate,
// }: LoanInput): Loan => {
//     if (!bookInput.bookId) throw new Error('Book id is required');
//     if (!userInput.userId) throw new Error('Member id is required');
//
//     if (!borrowDate) {
//         borrowDate = new Date(); // default to today
//     }
//
//     const book = bookDb.getBookById({ bookId: bookInput.bookId });
//     const user = usersDb.getUserById({ userId: userInput.userId });
//
//
//
//     if (!book) throw new Error('Book not found');
//     if (!user) throw new Error('User not found');
//
//
//     if(!checkBookAvailability(book)) {
//         throw new Error('Book is not available');
//
//     }
//     returnDate = returnDate || new Date(borrowDate.getTime() + 14 * 24 * 60 * 60 * 1000); // default to 14 days later
//     const loanId = uuidv4();
//     const newLoan = new Loan({ id: loanId, book, user, borrowDate, returnDate });
//     return loanDb.createLoan(newLoan);
//
//
// };

const deleteLoan = (id: string): void => {
  if(!id) throw new Error('Book id is required');
}

const checkBookAvailability = (book: Book): boolean => {
     const bookId = book.getBookId();
    const loans = loanDb.getLoansByBook(book)
    return loans.length >= book.getTotalCopies();

}
const getAllLoans = (): Loan[] => loanDb.getAllLoans();

export default {  deleteLoan, getAllLoans };
