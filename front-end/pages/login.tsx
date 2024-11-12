// pages/login.tsx

import React, { useState } from 'react';
import Header from "@components/Header";
import Head from "next/head";
import UserLoginForm from "@components/users/UserLoginForm";

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
                <UserLoginForm />
            </main>
        </>
    );
};

export default LoginPage;