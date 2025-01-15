import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from "next/head";
import Header from "@components/Header";
import { Loan, User } from "@types";
import LoanService from "@services/LoanService";
import useInterval from "use-interval";
import LoanOverviewTable from "@components/loans/LoanOverviewTable";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const LoansPage: React.FC = () => {
    const { t } = useTranslation();
    const [loans, setLoans] = useState<Array<Loan>>();
    const [error, setError] = useState<string>();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const loggedInUserString = sessionStorage.getItem('loggedInUser');
        if (loggedInUserString !== null) {
            setLoggedInUser(JSON.parse(loggedInUserString));
        }
    }, []);

    const getLoans = async () => {
        if (!loggedInUser) return;

        setError('');
        try {
            const response = await LoanService.getAllLoans();
            if (!response.ok) {
                if (response.status === 401) {
                    setError(t('app.not_auth'));
                } else {
                    setError(response.statusText);
                }
            } else {
                const loans = await response.json();
                setLoans(loans);
            }
        } catch (error) {
            setError(t('loan.load_error'));
            console.error(error);
        }
    };

    const returnBook = async (loan: Loan) => {
        try {
            await LoanService.returnBook(loan);
            // Refresh the loans list after returning a book
            getLoans();
        } catch (error) {
            console.error('Error returning book:', error);
            setError(t('loan.load_error'));
        }
    };

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
                <meta name="description" content="Bibliotheca app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="contain mt-4 ">
                <h2>{t('loan.name')}</h2>
                {error && <div className="text-red-800">{error}</div>}
                {loans && (
                    <LoanOverviewTable loans={loans} returnBook={returnBook} />
                )}
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'nl', ['common'])),
        },
    };
};

export default LoansPage;
