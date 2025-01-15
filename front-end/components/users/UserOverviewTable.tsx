import React from "react";
import { User } from "@types";
import { useTranslation } from "next-i18next";

type Props = {
    users: Array<User>;
    onDeleteUser: (id: string) => void;
    onToggleRole: (isChecked: boolean, user: User) => void;
};

const UsersOverviewTable: React.FC<Props> = ({ users, onDeleteUser, onToggleRole }: Props) => {
    const { t } = useTranslation();

    return (
        <>
            <a href="/users/add" className="btn btn-success">
                {t("app.user.register")}
            </a>
            {users && (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>E-mail</th>
                        <th>Admin</th>
                        <th>{t("actions")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.email}</td>
                            <td>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="toggle"
                                            defaultChecked={user.role === "admin"}
                                            onChange={(e) => onToggleRole(e.target.checked, user)}
                                        />
                                    </label>
                                </div>
                            </td>
                            <td>
                                <button
                                    className="btn btn-error btn-sm"
                                    onClick={() => onDeleteUser(user.id)}
                                >
                                    {t("app.user.delete")}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default UsersOverviewTable;
