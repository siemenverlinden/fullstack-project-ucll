import React from 'react';
import Header from "@components/Header";
import Head from "next/head";

const Home: React.FC = () => {
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
                <h1 className="text-center">Welkom bij Bibliotheca</h1>
                <p className="text-center">Beheer je bibliotheek eenvoudig en efficiënt.</p>


            </main>
        </>
    );
};

export default Home;
