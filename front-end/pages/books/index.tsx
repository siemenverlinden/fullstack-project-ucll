// pages/books/index.tsx

import React from 'react';

import Head from "next/head";
import Header from "@components/Header";
import {Book, User} from "@types";
import { useState, useEffect } from "react";
import BookService from "@services/BookService";
import BooksOverviewTable from "@components/books/BookOverviewTable";
import AddBookButton from "@components/books/AddBookButton";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const BooksPage: React.FC = () => {

    const { t } = useTranslation();
    const [books, setBooks] = useState<Array<Book>>();
    const [error, setError] = useState<string>();

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);



    const getBooks = async () => {
        setError("");
        const response = await BookService.getAllBooks();
        if (!response.ok) {
            if (response.status === 401) {
                setError(
                    t('app.not_auth')

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
        const loggedInUserString = sessionStorage.getItem('loggedInUser');
        if (loggedInUserString !== null) {
            setLoggedInUser(JSON.parse(loggedInUserString));
        }
        console.log(loggedInUser)
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
            <main className="container mt-4 max-w-screen-xl m-auto">
                <h2>Boeken</h2>
                {loggedInUser && loggedInUser.role === "admin" && (

                    <AddBookButton />
                )}

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
export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'nl', ['common'])),
        },
    };
};
export default BooksPage;
