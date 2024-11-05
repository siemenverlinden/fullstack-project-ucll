// pages/login.tsx

import React, { useState } from 'react';
import Header from "@components/Header";
import Head from "next/head";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Voeg authenticatielogica toe
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
                <h2>Inloggen</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Gebruikersnaam</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Voer gebruikersnaam in"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Wachtwoord</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Voer wachtwoord in"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Inloggen</button>
                </form>
            </main>
        </>
    );
};

export default LoginPage;
