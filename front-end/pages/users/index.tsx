import React, {useEffect, useState} from "react";
import Head from "next/head";
import Header from "@components/Header";
import UsersOverviewTable from "@components/users/UserOverviewTable";
import {StatusMessage, User} from "@types";
import UserService from "@services/UserService";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

const UsersPage: React.FC = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState<Array<User>>([]);
    const [error, setError] = useState<string>("");
    const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

    const getUsers = async () => {
        setError("");
        const response = await UserService.getAllUsers();

        if (!response.ok) {
            if (response.status === 401) {
                setError(t("app.not_auth"));
            } else {
                setError(response.statusText);
            }
        } else {
            const users = await response.json();
            setUsers(users);
        }
    };

    const deleteUser = async (id: string) => {

            const response = await UserService.deleteUser(id);
            if (response.status === 200) {
                setStatusMessage({message: "User deleted", type: "success"});
            }else{
                setStatusMessage({message: "Failed to delete user", type: "error"});
            }
            getUsers();

    };

    const handleRoleToggle = async (isChecked: boolean, user: User) => {
        user.role = isChecked ? "admin" : "user";
            const response = await UserService.toggleUserAdmin(user);
        if (response.status !== 200) {
            setStatusMessage({message: "Failed to change role", type: "error"});
        }
            getUsers();
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <Head>
                <title>Bibliotheca</title>
                <meta name="description" content="Bibliotheca app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="container mt-4 m-auto">
                <h2>{t("app.users.users")}</h2>
                <section>
                    {statusMessage && (
                        <div
                            className={`alert ${statusMessage.type === "error" ? "alert-danger" : "alert-success"}`}
                            role="alert"
                        >
                            {statusMessage.message}
                            {statusMessage.type === "success"}
                        </div>
                    )}
                    {error &&
                        <div
                            className="alert alert-danger"
                            role="alert"
                        >
                            {error}

                        </div>
                    }
                    <UsersOverviewTable
                        users={users}
                        onDeleteUser={deleteUser}
                        onToggleRole={handleRoleToggle}
                    />
                </section>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "nl", ["common"])),
        },
    };
};

export default UsersPage;
