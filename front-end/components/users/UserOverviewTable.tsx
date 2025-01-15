import React from "react";
import {User} from "@types";
import Link from "next/link";
import userService from "@services/UserService";
import {useTranslation} from "next-i18next";

type Props = {
    users: Array<User>;
};


const handleRoleToggle = async (isChecked, user) => {
    const newRole = isChecked ? "admin" : "user";

    user.role = newRole;
    try {
        const response = await userService.toggleUserAdmin(user);
        if (!response.ok) {
            throw new Error("Failed to update role");
        }

        const result = await response.json();
        console.log("Role updated successfully:", result);
    } catch (error) {
        console.error("Error updating role:", error);
        alert("Failed to update user role. Please try again.");
    }
};


const deleteUser = async (id: String) => {

    try {
        const response = await userService.deleteUser(id);
        if (!response.ok) {
            throw new Error("Failed to delete user");
        }

        const result = await response.json();
    } catch (error) {
        alert("Failed to delete user. Please try again.");
    }
};


const UsersOverviewTable: React.FC<Props> = ({
    users,
}: Props) => {
    const { t } = useTranslation();
    return (

        <>
            <a href="/users/add" className="btn btn-success">
                {t('app.user.register')}
            </a>
            {users && (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>E-mail</th>
                        <th>{t('app.user.role')}</th>
                        <th>{t('actions')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.email}</td>
                            <td>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Admin</span>
                                        <input type="checkbox" className="toggle" defaultChecked={user.role === "admin"}
                                               onChange={(e) => handleRoleToggle(e.target.checked, user)}
                                        />
                                    </label>
                                </div>
                            </td>
                            <td>
                                <button className="btn btn-error btn-sm"    onClick={(e) => deleteUser(user.id)}>{t('app.user.delete')}</button>
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
