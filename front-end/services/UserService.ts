import {Book, User} from "@types";

const getToken = (): string => {
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    return loggedInUserString ? JSON.parse(loggedInUserString).token : '';
};

const getAllUsers = () => {
  //  const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

const toggleUserAdmin = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL  + "/users/" + user.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(user),
    });
}
const loginUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
}

const createUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
}

const deleteUser = (id: String) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
    });
}
const UserService = {
    getAllUsers,
    loginUser,
    toggleUserAdmin,
    createUser,
    deleteUser
};

export default UserService;
