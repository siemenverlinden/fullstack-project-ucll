import { Book } from "@types";

const getToken = (): string => {
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    return loggedInUserString ? JSON.parse(loggedInUserString).token : '';
};

const getAllBooks = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/books", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
    });
};


const createBookCopy = (book: Book) => {

    return fetch(process.env.NEXT_PUBLIC_API_URL + "/books/" + book.id + "/copy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
    });
}
const createBook = (book: { copies: string; isbn: string; title: string; authors: string }) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(book),
    });
}

const getBookById = (id: string) => {
        return fetch(process.env.NEXT_PUBLIC_API_URL + "/books/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
        });
}

const getBookCopiesAvailable = (id: string) => {
        return fetch(process.env.NEXT_PUBLIC_API_URL + "/books/" + id + "/copies/available", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
        });
}
const getBookCopiesLoaned = (id: string) => {

    return fetch(process.env.NEXT_PUBLIC_API_URL + "/books/" + id + "/copies/loaned", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
    });
}
const BookService = {
    getAllBooks,
    createBook,
    getBookById,
    getBookCopiesAvailable,
    getBookCopiesLoaned,
    createBookCopy
};

export default BookService;
