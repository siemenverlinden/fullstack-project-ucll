import {Book, StatusMessage} from "@types";
import Link from "next/link";
import React, { useState } from 'react';
import BookService from "@services/BookService";
import UserService from "@services/UserService";
import {useTranslation} from "next-i18next";

const AddUser: React.FC = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [isbnError, setIsbnError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);


    const clearErrors = () => {
        setEmailError(null);
        setPasswordError(null);
        setStatusMessage(null);
    };

    const validate = (): boolean => {
        let result = true;

        if (!email && email.trim() === '') {
            setEmailError("Email is required");
            result = false;
        }

        if (!password && password.trim() === '') {
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


            const user = {
            email: email,
            password: password,
        };


        const response = await UserService.createUser(user);

        if (response.status === 200) {
            setStatusMessage({message: "user created", type: "success"});
        }else{
            setStatusMessage({message: "user not created", type: "error"});
        }

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
                    <h2 className="card-title text-2xl font-bold mb-6">{t('app.user.register')}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                                    <path
                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                                </svg>
                                <input type="text" className="grow" placeholder="Email"
                                       value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mt-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        fillRule="evenodd"
                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                        clipRule="evenodd"/>
                                </svg>
                                <input type="password" className="grow" value="password" value={password}
                                       onChange={(e) => setPassword(e.target.value)}/>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                {t('app.user.register')}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
};

export default AddUser;
