import React, {useEffect, useState} from "react";
import {Book} from "@types";
import Link from "next/link";
type Props = {
    books: Array<Book>;
};

const BooksOverviewTable: React.FC<Props> = ({
    books,
}: Props) => {

    const [loggedInUser, setLoggedInUser] = useState<String>(null);

    useEffect(() => {
        setLoggedInUser(sessionStorage.getItem("loggedInUser"));
    }, []);

    return (
        <>
            {books && (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Titel</th>
                        <th>Auteur</th>
                        {loggedInUser && (
                            <th>Acties</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.authors}</td>
                            {loggedInUser && (  <td>
                                <Link href={`/books/${book.id}`} className="btn btn-primary btn-sm me-2">
                                    Bekijken
                                </Link>
                            </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default BooksOverviewTable;
