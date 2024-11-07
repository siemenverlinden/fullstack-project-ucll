import React from "react";
import {User} from "@types";
import Link from "next/link";

type Props = {
    users: Array<User>;
};

const UsersOverviewTable: React.FC<Props> = ({
    users,
}: Props) => {
    return (
        <>
            {users && (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>E-mailadres</th>
                        <th>Acties</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.userId}>
                            <td>{user.email}</td>
                            <td>
                                <Link href={`/members/${user.userId}`} className="btn btn-info btn-sm me-2">
                                    Details
                                </Link>
                                <Link href={`/members/edit/${user.userId}`} className="btn btn-warning btn-sm me-2">
                                    Bewerken
                                </Link>
                                <button className="btn btn-danger btn-sm">Verwijderen</button>
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
