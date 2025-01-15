import {BookCopy, Loan} from "@types";

const getToken = (): string => {
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    return loggedInUserString ? JSON.parse(loggedInUserString).token : '';
};

const getAllLoans = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/loans", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
    });
}


const returnBook = (loan: Loan) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/loans/" + loan.id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

const loanBookCopy = (bookCopy: BookCopy) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/loans/" + bookCopy.id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
    });
}
const LoanService = {
    getAllLoans,
    returnBook,
    loanBookCopy
};
export default LoanService;
