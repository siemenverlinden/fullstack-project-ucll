import {Loan} from '../model/loan';
import {Book} from '../model/book';
import {User} from "../model/user";
import {v4 as uuidv4} from "uuid";
import {Member} from "../model/member";

const loans = [
    new Loan({
        id: uuidv4(),
        book: new Book({
            id: uuidv4(),
            title: 'The Lord of the Rings',
            description: 'The Lord if the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.',
            authors: ['J. R. R. Tolkien'],
            isbn: '9780261102385',
            copiesAvailable: 5,
        }),
        member: new Member(
            {
                id: uuidv4(),
                user: new User({
                    id:  uuidv4(),
                    email: 'john@mail.com',
                    password: 'password',
                    role: 'member',
                    created_at: new Date('2021-01-01')}),

                phone: '123456789',
            },),
        borrowDate: new Date(),
        returnDate: new Date(),
    }),
];


const createLoan = (loan: Loan): Loan => {
    loans.push(loan);
    return loan;
}

const getLoansByMember = (member: Member): Loan[] => {
    return loans.filter(Loan => Loan.getMember().getId() === member.getId());
}

const getLoansByBook = (book: Book): Loan[] => {
    return loans.filter(loan => loan.getBook().getId() === book.getId());
}
const getAllLoans = (): Loan[] => loans;

export default {
    createLoan,
    getLoansByMember,
    getLoansByBook,
    getAllLoans,
}