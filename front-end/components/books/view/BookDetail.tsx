import React, {useEffect, useState} from "react";
import {Book} from "@types";
import Link from "next/link";
import UserService from "@services/UserService";
import {router} from "next/client";
import BookService from "@services/BookService";
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


    const createBookCopy = async () => {

        const response = await BookService.createBookCopy(book);

    };

    return (
        <div>
            <h1>{book.title}</h1>
            <p><strong>Author(s):</strong> {book.authors}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <button type="button" className="btn btn-success" onClick={() => createBookCopy()}>
                Add book copy
            </button>
        </div>
    );

}

export default BookDetail;
