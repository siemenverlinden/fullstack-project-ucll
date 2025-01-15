import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useTranslation} from "next-i18next";



const AddBookButton: React.FC = () => {

    const { t } = useTranslation();
    const [loggedInUser, setLoggedInUser] = useState<String>(null);

    useEffect(() => {
        // @ts-ignore
        setLoggedInUser(sessionStorage.getItem("loggedInUser"));
    }, []);

    return (
        <>
            {loggedInUser && (
            <Link href="/books/add" className="btn btn-success mb-3">
                {t('book.add')}
            </Link>
                )}
        </>

    );
};

export default AddBookButton;
