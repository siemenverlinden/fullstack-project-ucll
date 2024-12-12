import React from "react";
import {Loan} from "@types";
import Link from "next/link";
import LoanService from "@services/LoanService";
import {formatDate} from "../../utils/dateUtils";
type Props = {
    loans: Array<Loan>;
};

const returnBook = async (loan: Loan) => {

     await LoanService.returnBook(loan);
}
const LoanOverviewTable: React.FC<Props> = ({
    loans,
}: Props) => {
    return (
        <>
                {loans  && (

                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th>Boek</th>
                                <th>Retour datum</th>
                                <th>Actie</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loans.map((loan) => (
                                <tr key={loan.id}>
                                    <td>{loan.bookCopy.book.title}</td>
                                    {<td>{formatDate(loan.dueDate)}</td>}
                                    <td>
                                        <button className="btn btn-warning "
                                                onClick={() => returnBook(loan)}>Retourneren
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
        </>
    );
};

export default LoanOverviewTable;
