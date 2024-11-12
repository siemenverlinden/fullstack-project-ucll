import React, {useEffect, useState} from "react";
import {Book} from "@types";
import Link from "next/link";
type Props = {
    book: Book;
};
const BookDetail: React.FC<Props> = ({
    book
}: Props) => {
    const [loggedInUser, setLoggedInUser] = useState<String>(null);
    useEffect(() => {
        // @ts-ignore
        return setLoggedInUser(sessionStorage.getItem("loggedInUser"));
    }, []);

    if (!book) {
        return <div>Loading book details...</div>;
    }

    return (
        <div>
            <h1>{book.title}</h1>
            <p><strong>Author(s):</strong> {book.authors}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
        </div>
    );

}

export default BookDetail;
