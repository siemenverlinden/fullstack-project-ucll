// pages/books/index.tsx

import React from 'react';
import Link from 'next/link';
import Head from "next/head";
import Header from "@components/Header";
import { Book } from "@types";
import { useState, useEffect } from "react";
import BookService from "@services/BookService";
import BooksOverviewTable from "@components/books/BookOverviewTable";
import AddBookButton from "@components/books/AddBookButton";

const BooksPage: React.FC = () => {

    const [books, setBooks] = useState<Array<Book>>();
    const [error, setError] = useState<string>();

    
    const getBooks = async () => {
        setError("");
        const response = await BookService.getAllBooks();
        if (!response.ok) {
            if (response.status === 401) {
                setError(
                    "You are not authorized to view this page. Please login first."
                );
            } else {
                setError(response.statusText);
            }
        } else {
            const books = await response.json();
            setBooks(books);
        }
    };
    useEffect(() => {
        getBooks();
    }, []);

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
               <AddBookButton />
                <section>
                    {error && <div className="text-red-800">{error}</div>}
                    {books && (
                        <BooksOverviewTable
                            books={books}
                        />
                    )}
                </section>
            </main>
        </>
    );
};

export default BooksPage;
