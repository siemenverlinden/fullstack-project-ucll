import database from "../util/database";
import {Loan} from '../model/loan';


const getAllLoans
    = async (): Promise<Loan[]> => {
    try {
        const loansPrisma = await database.loan.findMany({
            include: {
                user: true,
                book: true
        }
        });
        return loansPrisma.map((loanPrisma) => Loan.from(loanPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};




export default {
    getAllLoans
}