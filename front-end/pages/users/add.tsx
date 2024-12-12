// pages/books/index.tsx

import React, {useState} from 'react';
import Link from 'next/link';
import Head from "next/head";
import Header from "@components/Header";
import AddBook from "@components/books/AddBook";
import AddUser from "@components/users/AddUser";

const BooksPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [copies, setCopies] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Voeg logica toe om het boek toe te voegen
    };

    return (
        <>
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
                    <h2>Nieuwe gebruiken Toevoegen</h2>
                    <AddUser />
                </main>
            </>
        </>
    );
};

export default BooksPage;
