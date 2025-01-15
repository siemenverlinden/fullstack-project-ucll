import { StatusMessage } from "@types";
import { useRouter } from "next/router";
import React, { useState } from "react";
import UserService from "@services/UserService";
import Link from "next/link";
import {useTranslation} from "next-i18next";

const UserLoginForm: React.FC = () => {
    const { t } = useTranslation();
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
            <div className="card w-96 bg-base-100 border m-auto">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold mb-6">{t('app.user.login')}</h2>
                    <Link key="register" href="/register"/>
                    <form className="form-signin" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                     className="w-4 h-4 opacity-70">
                                    <path
                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                                    <path
                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                                </svg>
                                <input id="mailInput" type="email" className="grow" value={email} placeholder="email@example.com"
                                       onChange={(event) => setEmail(event.target.value)}/>
                                {emailError && (
                                    <div className="label">
                                    <span className="label-text-alt text-red-800">{emailError}</span>
                                    </div>
                                )}


                            </label>
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                            <span className="label-text">Password</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                     className="w-4 h-4 opacity-70">
                                    <path fill-rule="evenodd"
                                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                          clip-rule="evenodd"/>
                                </svg>
                                <input value={password} type="password" className="grow" placeholder="Enter password"  id="passwordInput"  onChange={(event) => setPassword(event.target.value)}/>
                                {passwordError && (
                                    <div className="label">
                                        <span className="label-text-alt text-red-800">{passwordError}</span>
                                    </div>
                                )}
                            </label>

                        </div>
                        <div className="form-control mt-6">
                            <button type={"submit"} className="btn btn-primary">
                                {t('app.user.login')}
                            </button>
                        </div>
                    </form>
                    <div className="divider">{t('app.user.or')}</div>
                    <div className="text-center">
                        <a href="/users/add" className="link link-primary"> {t('app.user.add')}</a>
                    </div>
                </div>
            </div>

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
                            style={{cursor: "pointer"}}
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

