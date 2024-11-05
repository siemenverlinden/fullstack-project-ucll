import {Loan} from '../model/loan';
import {Book} from '../model/book';
import {User} from "../model/user";
import {v4 as uuidv4} from "uuid";

const loans = [
    new Loan({
        id: uuidv4(),
        book: new Book({
            bookId: uuidv4(),
            title: 'The Lord of the Rings',
            description: 'The Lord if the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.',
            authors: ['J. R. R. Tolkien'],
            isbn: '9780261102385',
            totalCopies: 5,
        }),
        user: new User(
            {
                    userId:  uuidv4(),
                    email: 'john@mail.com',
                    password: 'password',
                    createdAt: new Date('2021-01-01')}),
        borrowDate: new Date(),
        returnDate: new Date(),
    }),
];


const createLoan = (loan: Loan): Loan => {
    loans.push(loan);
    return loan;
}

const getLoansByUser = (user: User): Loan[] => {
    return loans.filter(Loan => Loan.getUser().getUserId() === user.getUserId());
}

const getLoansByBook = (book: Book): Loan[] => {
    return loans.filter(loan => loan.getBook().getBookId() === book.getBookId());
}
const getAllLoans = (): Loan[] => loans;

export default {
    createLoan,
    getLoansByUser,
    getLoansByBook,
    getAllLoans,
}