// pages/books/index.tsx

import React from 'react';
import Link from 'next/link';
import Head from "next/head";
import Header from "@components/Header";

const BooksPage: React.FC = () => {
    // Voorbeeldgegevens
    const books = [
        { bookId: '1', title: 'De Ontdekking van de Hemel', author: 'Harry Mulisch', copiesAvailable: 3 },
        { bookId: '2', title: 'Het Diner', author: 'Herman Koch', copiesAvailable: 5 },
        // Voeg meer boeken toe
    ];

    return (
        <>
            <Head>
                <title>Bibliotheca</title>
                <meta name="description" content="Bibliotheca app"/>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main className="container mt-4">
                <h2>Boeken</h2>
                <Link href="/books/add" className="btn btn-success mb-3">
                    Nieuw Boek Toevoegen
                </Link>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Titel</th>
                        <th>Auteur</th>
                        <th>Beschikbaar</th>
                        <th>Acties</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book) => (
                        <tr key={book.bookId}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.copiesAvailable}</td>
                            <td>
                                <Link href={`/books/${book.bookId}`} className="btn btn-info btn-sm me-2">
                                    Details
                                </Link>
                                <Link href={`/books/edit/${book.bookId}`} className="btn btn-warning btn-sm me-2">
                                    Bewerken
                                </Link>
                                <button className="btn btn-danger btn-sm">Verwijderen</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </main>
        </>
    );
};

export default BooksPage;
