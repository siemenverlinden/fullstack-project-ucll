// pages/books/index.tsx

import React, {useState} from 'react';
import Link from 'next/link';
import Head from "next/head";
import Header from "@components/Header";
import BooksOverviewTable from "@components/books/BookOverviewTable";
import AddBook from "@components/books/AddBook";

const AddBookPage: React.FC = () => {

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
                <h2>Nieuw Boek Toevoegen</h2>
                <AddBook />
            </main>
        </>
    );
};

export default AddBookPage;
