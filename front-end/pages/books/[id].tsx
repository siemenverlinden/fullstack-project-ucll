// pages/books/index.tsx

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Head from "next/head";
import Header from "@components/Header";
import BooksOverviewTable from "@components/books/BookOverviewTable";
import AddBook from "@components/books/AddBook";
import {useRouter} from "next/router";
import {Book, BookCopy} from "@types";
import BookService from "@services/BookService";
import BookDetail from "@components/books/view/BookDetail";
import BookCopyLoaned from "@components/books/view/BookCopyLoaned";
import BookCopyAvailable from "@components/books/view/BookCopyAvailable";
import useSWR from "swr";
import useInterval from 'use-interval';

const ViewBook: React.FC = () => {

    const router = useRouter();
    const { id } = router.query;


    const fetcher = async (key: string) => {
        if(!id) {
            console.log('no id')
        }
        const [bookResponse, bookCopyAvailableResponse, bookCopyLoanedResponse] = await Promise.all([
            BookService.getBookById(id as string),
            BookService.getBookCopiesAvailable(id as string),
            BookService.getBookCopiesLoaned(id as string)
        ]);

        if (!bookResponse.ok || !bookCopyAvailableResponse.ok  || !bookCopyLoanedResponse.ok) {
            console.log('wrong response')
            // if (lecturerResponse.status === 401) {
            //     setErrorMessage(
            //         "You are not authorized to view this page. Please login first."
            //     );
            // } else {
            //     setErrorMessage(lecturerResponse.statusText);
            // }
        } else {
            const [book, copyAvailable, copyLoaned] = await Promise.all([
                bookResponse.json(),
                bookCopyAvailableResponse.json(),
                bookCopyLoanedResponse.json(),
            ]);

            return { book, copyAvailable, copyLoaned };
        }
    };

    const { data, isLoading, error } = useSWR(id ? `bookCopies-${id}` : null, fetcher);

    useInterval(() => {
        const { data, isLoading, error } = useSWR(id ? `bookCopies-${id}` : null, fetcher);
    }, 1000);

    if (!id || isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;



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
                {data.book && (
                    <BookDetail book={data.book}/>

                )}
                {data.copyAvailable && (
                <BookCopyAvailable bookCopiesAvailable={data.copyAvailable}/>
                )}
                {data.copyLoaned && (
                <BookCopyLoaned bookCopiesLoaned={data.copyLoaned}/>
                )}

            </main>
        </>
    )
        ;
};

export default ViewBook;
