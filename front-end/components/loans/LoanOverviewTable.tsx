import React from "react";
import {Loan} from "@types";
import Link from "next/link";
import LoanService from "@services/LoanService";

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
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Boek</th>
                            <th>Actie</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loans.map((loan) => (
                            <tr key={loan.id}

                                role="button">
                                <td>{loan.bookCopy.book.title}</td>
                                {/*<td>{loan.returnDate}</td>*/}
                                <td>
                                    <button className="btn btn-warning btn-sm me-2"  onClick={() => returnBook(loan)}>Retourneren</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
        </>
    );
};

export default LoanOverviewTable;
