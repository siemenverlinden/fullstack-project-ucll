import React from 'react';
import Link from "next/link";

const Header: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link href="/"  className="navbar-brand">
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
                        <li className="nav-item">
                            <Link href="/users" className="nav-link">
                                Leden
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/loans" className="nav-link">
                                Uitleningen
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/login" className="nav-link">
                                Inloggen
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
