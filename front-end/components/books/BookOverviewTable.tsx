import React from "react";
import {Book} from "@types";
import Link from "next/link";

type Props = {
    books: Array<Book>;
};

const BooksOverviewTable: React.FC<Props> = ({
    books,
}: Props) => {
    return (
        <>
            {books && (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Titel</th>
                        <th>Auteur</th>
                        <th>Aantal exemplaren</th>
                        <th>Acties</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book) => (
                        <tr key={book.bookId}>
                            <td>{book.title}</td>
                            <td>{book.authors}</td>
                            <td>{book.copiesCount}</td>
                            <td>
                                <Link href={`/books/edit/${book.bookId}`} className="btn btn-warning btn-sm me-2">
                                    Bewerken
                                </Link>
                                <button className="btn btn-danger btn-sm">Verwijderen</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default BooksOverviewTable;
