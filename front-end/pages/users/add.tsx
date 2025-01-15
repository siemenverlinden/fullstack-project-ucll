import React from 'react';
import Head from "next/head";
import Header from "@components/Header";
import AddUser from "@components/users/AddUser";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

const BooksPage: React.FC = () => {
    const { t } = useTranslation();

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
                <main className="container mt-4  m-auto">
                    <h2>{t('app.user.add')}</h2>
                    <AddUser  />
                </main>
            </>
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
export default BooksPage;
