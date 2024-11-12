import React, {useEffect, useState} from "react";
import {Book} from "@types";
import Link from "next/link";



const AddBookButton: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<String>(null);

    useEffect(() => {
        // @ts-ignore
        setLoggedInUser(sessionStorage.getItem("loggedInUser"));
    }, []);

    return (
        <>
            {loggedInUser && (
            <Link href="/books/add" className="btn btn-success mb-3">
                Nieuw Boek Toevoegen
            </Link>
                )}
        </>

    );
};

export default AddBookButton;
