// pages/members/index.tsx

import React, {useState} from 'react';
import Link from 'next/link';
import Head from "next/head";
import Header from "@components/Header";

const MembersPage: React.FC = () => {
    const members = [
        { memberId: '1', name: 'John Doe', email: 'john@example.com' },
        { memberId: '2', name: 'Jane Smith', email: 'jane@example.com' },
        // Voeg meer leden toe
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
                <h2>Leden</h2>
                <Link href="/members/add" className="btn btn-success mb-3">
                    Nieuw Lid Toevoegen
                </Link>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Naam</th>
                        <th>E-mailadres</th>
                        <th>Acties</th>
                    </tr>
                    </thead>
                    <tbody>
                    {members.map((member) => (
                        <tr key={member.memberId}>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                            <td>
                                <Link href={`/members/${member.memberId}`}  className="btn btn-info btn-sm me-2">
                                   Details
                                </Link >
                                <Link href={`/members/edit/${member.memberId}`}  className="btn btn-warning btn-sm me-2">
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

export default MembersPage;
