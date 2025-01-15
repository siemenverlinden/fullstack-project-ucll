import React from "react";
import { Loan } from "@types";
import { useTranslation } from "next-i18next";

type Props = {
    loans: Array<Loan>;
    returnBook: (loan: Loan) => void;
};

const LoanOverviewTable: React.FC<Props> = ({ loans, returnBook }: Props) => {
    const { t } = useTranslation();

    return (
        <>
            {loans && (
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
                                <td>{loan.dueDate}</td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => returnBook(loan)}
                                    >
                                        {t('book.copy.return')}
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
