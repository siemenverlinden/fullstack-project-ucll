// pages/books/index.tsx

import React, {useState} from 'react';
import Link from 'next/link';
import Head from "next/head";
import Header from "@components/Header";

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
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Titel</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            placeholder="Voer de titel van het boek in"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">Auteur</label>
                        <input
                            type="text"
                            className="form-control"
                            id="author"
                            placeholder="Voer de naam van de auteur in"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="copies" className="form-label">Aantal Exemplaren</label>
                        <input
                            type="number"
                            className="form-control"
                            id="copies"
                            min="1"
                            value={copies}
                            onChange={(e) => setCopies(parseInt(e.target.value))}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Opslaan</button>
                </form>
            </main>
        </>
    );
};

export default BooksPage;
