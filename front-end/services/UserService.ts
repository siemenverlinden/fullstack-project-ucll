import { Book } from "@types";

const getAllUsers = () => {
  //  const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;
console.log(process.env.NEXT_PUBLIC_API_URL)
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
       //     Authorization: `Bearer ${token}`,
        },
    });
};


const UserService = {
    getAllUsers,
};

export default UserService;
