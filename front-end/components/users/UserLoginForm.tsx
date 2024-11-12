import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";

const UserLoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();

    const clearErrors = () => {
        setEmailError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!email && email.trim() === "") {
            setEmailError("Email is required");
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        clearErrors();

        if (!validate()) {
            return;
        }

        setStatusMessages([
            {
                message: `Login succesful. Redirecting to homepage...`,
                type: "success",
            },
        ]);

        sessionStorage.setItem("loggedInUser", email);

        setTimeout(() => {
            router.push("/");
        }, 2000);
    };

    return (
        <>
            <h3 className="px-0">Login</h3>
            {statusMessages && (
                <div className="row">
                    <ul className="list-none mb-3 mx-auto ">
                        {statusMessages.map(({message, type}, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    "text-red-800": type === "error",
                                    "text-green-800": type === "success",
                                })}>
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="mailInput" className="form-label">email address</label>
                <div className="block mb-2 text-sm font-medium">
                    <input
                        className="form-control"
                        id="mailInput"
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    {emailError && (
                        <div className="text-red-800 ">{emailError}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary">Inloggen</button>
            </form>


        </>
    );
};

export default UserLoginForm;
