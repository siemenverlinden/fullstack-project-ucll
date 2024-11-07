// pages/users/index.tsx

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Head from "next/head";
import Header from "@components/Header";
import UsersOverviewTable from "@components/users/UserOverviewTable";
import { User } from "@types";
import UserService from "@services/UserService";

const UsersPage: React.FC = () => {

    const [users, setUsers] = useState<Array<User>>();
    const [error, setError] = useState<string>();

    const getUsers = async () => {
        setError('');
        const response = await UserService.getAllUsers();

        if (!response.ok) {
            if (response.status === 401) {
                setError(
                    'You are not authorized to view this page. Please login first.'
                );
            } else {
                setError(response.statusText);
            }
        } else {
            const users = await response.json();
            setUsers(users);
        }
    };

    useEffect(() => {
        getUsers();
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
                <h2>Leden</h2>
                <Link href="/front-end/pages/users/add" className="btn btn-success mb-3">
                    Nieuw Lid Toevoegen
                </Link>
                <section>
                    {error && <div className="text-red-800">{error}</div>}
                    {users && (
                        <UsersOverviewTable
                            users={users}
                        />
                    )}
                </section>
            </main>
        </>
    );
};

export default UsersPage;
