import React from "react";
import {Loan} from "@types";
import Link from "next/link";
import LoanService from "@services/LoanService";
import {formatDate} from "../../utils/dateUtils";
import {useTranslation} from "next-i18next";
type Props = {
    loans: Array<Loan>;
};

const returnBook = async (loan: Loan) => {

     await LoanService.returnBook(loan);
}
const LoanOverviewTable: React.FC<Props> = ({
    loans,
}: Props) => {
    const { t } = useTranslation();
    return (
        <>
                {loans  && (

                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th>{t('book.title')}</th>
                                <th>{t('book.loan.return')}</th>
                                <th>{t('action')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loans.map((loan) => (
                                <tr key={loan.id}>
                                    <td>{loan.bookCopy.book.title}</td>
                                    {<td>{formatDate(loan.dueDate)}</td>}
                                    <td>
                                        <button className="btn btn-warning "
                                                onClick={() => returnBook(loan)}>{t('book.copy.return')}
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
