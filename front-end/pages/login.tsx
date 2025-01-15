import React from 'react';
import Header from "@components/Header";
import Head from "next/head";
import UserLoginForm from "@components/users/UserLoginForm";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

const LoginPage: React.FC = () => {

    const { t } = useTranslation();

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
            <main className="container mt-4 text-center  m-auto ">
                <UserLoginForm/>
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
export default LoginPage;
