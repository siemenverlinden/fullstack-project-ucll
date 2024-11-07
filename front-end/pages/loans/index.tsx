// pages/users/index.tsx

import React, {useState} from 'react';
import Link from 'next/link';
import Head from "next/head";
import Header from "@components/Header";

const LoansPage: React.FC = () => {
    // Voorbeeldgegevens
    const loans = [
        {
            loanId: '1',
            bookTitle: 'De Ontdekking van de Hemel',
            memberName: 'John Doe',
            dueDate: '2023-10-31',
        },
        // Voeg meer uitleningen toe
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
                <h2>Uitleningen</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Boek</th>
                        <th>Lid</th>
                        <th>Verwacht op</th>
                        <th>Acties</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loans.map((loan) => (
                        <tr key={loan.loanId}>
                            <td>{loan.bookTitle}</td>
                            <td>{loan.memberName}</td>
                            <td>{loan.dueDate}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2">Retourneren</button>
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

export default LoansPage;
