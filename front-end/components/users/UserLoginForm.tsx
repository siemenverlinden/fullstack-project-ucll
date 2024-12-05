import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import UserService from "@services/UserService";

const UserLoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
    const router = useRouter();

    const clearErrors = () => {
        setEmailError(null);
        setPasswordError(null);
        setStatusMessage(null);
    };

    const validate = (): boolean => {
        let result = true;

        if (!email || email.trim() === "") {
            setEmailError("Email is required");
            result = false;
        }
        if (!password || password.trim() === "") {
            setPasswordError("Password is required");
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        clearErrors();

        if (!validate()) {
            return;
        }

        const user = { email: email, password: password };
        const response = await UserService.loginUser(user);

        if (response.status === 200) {
            setStatusMessage({ message: "login success, you will be redirected ...", type: "success" });

            const user = await response.json();

            sessionStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    id: user.id,
                    token: user.token,
                    email: user.email,
                    role: user.role,
                })
            );
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } else if (response.status === 401) {
            const { errorMessage } = await response.json();
            setStatusMessage({ message: errorMessage, type: "error" });
        } else {
            setStatusMessage({
                message: "Login failed, please try again later",
                type: "error",
            });
        }
    };

    // Define rows with email and password data
    const rows = [
        { email: "user@example.com", password: "user123", role: "user" },
        { email: "admin@example.com", password: "admin123", role: "admin" },
    ];

    // Handle row click
    const handleRowClick = (email: string, password: string) => {
        setEmail(email);
        setPassword(password);
    };

    return (
        <>
            {statusMessage && (
                <div
                    className={`alert ${statusMessage.type === "error" ? "alert-danger" : "alert-success"}`}
                    role="alert"
                >
                    {statusMessage.message}
                    {statusMessage.type === "success"}
                </div>
            )}

            <form className="form-signin" onSubmit={handleSubmit}>
                <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
                     alt="" width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

                <div className="block mb-2 text-sm font-medium">
                    <input
                        className="form-control"
                        id="mailInput"
                        type="email"
                        value={email}
                        placeholder={"Email"}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    {emailError && <div className="text-red-800">{emailError}</div>}
                    <input
                        className="form-control"
                        id="passwordInput"
                        type="password"
                        value={password}
                        placeholder={"Password"}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {passwordError && (
                        <div className="text-red-800">{passwordError}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-lg btn-primary btn-block">
                    Inloggen
                </button>
            </form>

            <div className="debug-login">
                <br/>
                <h2>Click login user (DEBUG)</h2>
                <table className="table small">
                    <thead>
                    <tr>
                    <th scope="col">Email</th>
                        <th scope="col">Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row, index) => (
                        <tr
                            key={index}
                            onClick={() => handleRowClick(row.email, row.password)}
                            style={{ cursor: "pointer" }}
                        >
                            <th scope="row">{row.email}</th>
                            <td>{row.role}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UserLoginForm;

