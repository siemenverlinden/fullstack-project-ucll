import React, { useEffect, useState } from "react";
import { BookCopy } from "@types";
import { useTranslation } from "next-i18next";

type Props = {
    bookCopiesAvailable: BookCopy[];
    loanBookCopy: (bookCopy: BookCopy) => void;
};

const BookCopyAvailable: React.FC<Props> = ({ bookCopiesAvailable, loanBookCopy }: Props) => {
    const { t } = useTranslation();
    const [loggedInUser, setLoggedInUser] = useState<String | null>(null);

    useEffect(() => {
        setLoggedInUser(sessionStorage.getItem("loggedInUser"));
    }, []);

    if (!bookCopiesAvailable) {
        return <div>{t("book.copy.loading")}</div>;
    }

    return (
        <div>
            <div className={"flex items-end"}>
                <div className="flex-col stats shadow">
                    <div className="stat">
                        <div className="stat-title">{t("book.copy.available")}</div>
                        <div className="stat-value text-center">{bookCopiesAvailable.length}</div>
                    </div>
                </div>
                {loggedInUser && bookCopiesAvailable.length > 0 && (
                    <button
                        type="button"
                        className="btn btn-info ml-5"
                        onClick={() => loanBookCopy(bookCopiesAvailable[0])}
                    >
                        {t("book.copy.loan")}
                    </button>
                )}
            </div>
        </div>
    );
};

export default BookCopyAvailable;
