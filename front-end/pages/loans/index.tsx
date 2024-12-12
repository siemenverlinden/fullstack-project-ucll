import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Head from "next/head";
import Header from "@components/Header";
import {Loan, User} from "@types";
import LoanService from "@services/LoanService";
import useInterval from "use-interval";
import {json} from "next/dist/client/components/react-dev-overlay/server/shared";
import {log} from "next/dist/server/typescript/utils";
import LoanOverviewTable from "@components/loans/LoanOverviewTable";

const LoansPage: React.FC = () => {

    const [loans, setLoans] = useState<Array<Loan>>();
    const [error, setError] = useState<string>();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);


    useEffect(() => {
        console.log('save to state')
        const loggedInUserString = sessionStorage.getItem('loggedInUser');
        if (loggedInUserString !== null) {
            setLoggedInUser(JSON.parse(loggedInUserString));
        }
    }, []);

    const getLoans = async () => {
        if (!loggedInUser) return; // Ensure loggedInUser is available

        setError('');
        try {
            const response = await LoanService.getAllLoans();
            if (!response.ok) {
                if (response.status === 401) {
                    setError(
                        'You are not authorized to view this page. Please login first.'
                    );
                } else {
                    setError(response.statusText);
                }
            } else {
                const loans = await response.json();
                setLoans(loans);
            }
        } catch (error) {
            setError('Failed to fetch loans.');
            console.error(error);
        }
        }
// Fetch loans when loggedInUser is set
    useEffect(() => {
        if (loggedInUser) {
            getLoans();
        }
    }, [loggedInUser]);

    useInterval(() => {
        if (!error) getLoans();
    }, 1000);
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
                <main className="contain mt-4 ">
                    <h2>Uitleningen</h2>
                    {error && <div className="text-red-800">{error}</div>}
                    {loans && (
                        <LoanOverviewTable loans={loans}  />
                    )}
                </main>
            </>
        );
    };

    export default LoansPage;
