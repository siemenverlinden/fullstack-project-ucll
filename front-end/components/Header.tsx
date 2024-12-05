import React from 'react';
import Link from "next/link";
import { useEffect, useState } from "react";
import {User} from "@types";
const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const loggedInUserString = sessionStorage.getItem('loggedInUser');
        if (loggedInUserString !== null) {
            setLoggedInUser(JSON.parse(loggedInUserString));
        }
    }, []);

    const handleClick = () => {
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser(null);

    };

   const getCcsClassBasedOnUser = () => {
        if (loggedInUser && loggedInUser.role === "admin") {
            return "bg-primary";
        } else {
            return "bg-dark";
        }
   }
    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-dark ${getCcsClassBasedOnUser()}`}>
            <div className="container">
                <Link href="/" className="navbar-brand">
                    Bibliotheca
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Navigatie tonen/verbergen"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link href="/books" className="nav-link">
                                Boeken
                            </Link>
                        </li>
                        {loggedInUser && (
                            <li className="nav-item">
                                <Link href="/users" className="nav-link">
                                    Leden
                                </Link>
                            </li>
                        )}
                        {loggedInUser && (
                            <li className="nav-item">
                                <Link href="/loans" className="nav-link">
                                    Uitleningen
                                </Link>
                            </li>
                        )}
                        {!loggedInUser && (
                            <li className="nav-item">
                                <Link href="/login" className="nav-link">
                                    Inloggen
                                </Link>
                            </li>
                        )}
                        {loggedInUser && (
                            <li className="nav-item">
                                <Link href="/users" onClick={handleClick} className="nav-link">
                                    Logout
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            </nav>
        </>

    );
};

export default Header;
