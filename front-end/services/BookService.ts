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


const BookService = {
    getAllBooks,
};

export default BookService;
