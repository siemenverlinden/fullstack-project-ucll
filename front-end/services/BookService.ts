import { Book } from "@types";

const getAllBooks = () => {
  //  const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;
console.log(process.env.NEXT_PUBLIC_API_URL)
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/books", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
       //     Authorization: `Bearer ${token}`,
        },
    });
};


const createBook = (book: { copies: string; isbn: string; title: string; authors: string }) => {
  //  const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;

    console.log(JSON.stringify(book))
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
         //   Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(book),
    });
}

const getBookById = (id: string) => {
    //  const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;

        return fetch(process.env.NEXT_PUBLIC_API_URL + "/books/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
             //   Authorization: `Bearer ${token}`,
            },
        });
}

const getBookCopiesAvailable = (id: string) => {
    //  const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;
        return fetch(process.env.NEXT_PUBLIC_API_URL + "/books/" + id + "/copies/available", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
             //   Authorization: `Bearer ${token}`,
            },
        });
}
const getBookCopiesLoaned = (id: string) => {
    //  const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + "/books/" + id + "/copies/loaned", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //   Authorization: `Bearer ${token}`,
        },
    });
}
const BookService = {
    getAllBooks,
    createBook,
    getBookById,
    getBookCopiesAvailable,
    getBookCopiesLoaned
};

export default BookService;
