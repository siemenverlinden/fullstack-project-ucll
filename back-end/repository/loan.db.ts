import database from "../util/database";
import {Loan} from '../model/loan';


const getAllLoans
    = async (): Promise<Loan[]> => {
    try {
        const loansPrisma = await database.loan.findMany({
            include: {
                user: true,
                bookCopy: { include: { book: true } },
        }
        });
        return loansPrisma.map((loanPrisma) => Loan.from(loanPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllLoansByUserId = async (userId: string): Promise<Loan[]> => {
    try {
        const loansPrisma = await database.loan.findMany({
            where: {
                userId: userId
            },
            include: {
                user: true,
                bookCopy: { include: { book: true } },
            }
        });
        return loansPrisma.map((loanPrisma) => Loan.from(loanPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getLoanById = async (id: string): Promise<Loan | null> => {
    try {
        const loanPrisma = await database.loan.findUnique({
            where: {
                id: id
            },
            include: {
                user: true,
                bookCopy: { include: { book: true } },
            }
        });
        if (!loanPrisma) {
            return null;
        }
        return Loan.from(loanPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}
const deleteLoan = async (id: string): Promise<void> => {
    try {
        await database.loan.delete({
            where: {
                id: id
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createLoan = async (loan: Loan): Promise<Loan> => {
    try {
        const loanPrisma = await database.loan.create({
            data: {
                id: loan.getBookCopy().getId(),
                user: {
                    connect: { id: loan.getUser().getId() },
                },
                bookCopy: {
                    connect: { id: loan.getBookCopy().getId() },
                },
                dueDate : loan.getDueDate(),
                borrowDate: loan.getBorrowDate()

            },
            include: {
                user: true,
                bookCopy: { include: { book: true } },
            }
        });
        return Loan.from(loanPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}
export default {
    getAllLoans,
    getAllLoansByUserId,
    getLoanById,
    deleteLoan,
    createLoan
}