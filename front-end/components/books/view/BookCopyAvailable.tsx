import React, {useEffect, useState} from "react";
import {BookCopy} from "@types";
import Link from "next/link";
import LoanService from "@services/LoanService";
type Props = {
    bookCopiesAvailable: BookCopy[];
};

const loanBookCopy = async (bookCopy: BookCopy) => {
    await LoanService.loanBookCopy(bookCopy);
}

const BookCopyAvailable: React.FC<Props> = ({
                                                bookCopiesAvailable
}: Props) => {
    // @ts-ignore
    const [loggedInUser, setLoggedInUser] = useState<String>(null);
    useEffect(() => {
        console.log(bookCopiesAvailable)
        // @ts-ignore
        return setLoggedInUser(sessionStorage.getItem("loggedInUser"));
    }, []);

    if (!bookCopiesAvailable) {
        return <div>Loading book details...</div>;
    }

    return (
        <div>

                <div className={"flex items-end"}>
                <div className=" flex-col stats shadow">
                    <div className="stat">
                        <div className="stat-title">Beschikbare examplaren</div>
                        <div className="stat-value text-center">{bookCopiesAvailable.length}</div>
                    </div>
                </div>

                    {loggedInUser && bookCopiesAvailable.length && bookCopiesAvailable[0] && (
                        <button
                            type="button"
                            className=" btn btn-success ml-5 "
                            onClick={() => loanBookCopy(bookCopiesAvailable[0])}
                        >
                            Uitlenen
                        </button>
                    )}
                </div>
        </div>
    );

}

export default BookCopyAvailable;
