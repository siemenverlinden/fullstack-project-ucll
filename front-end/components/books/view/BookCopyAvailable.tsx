import React, {useEffect, useState} from "react";
import {BookCopy} from "@types";
import Link from "next/link";
type Props = {
    bookCopiesAvailable: BookCopy[];
};
const BookCopyAvailable: React.FC<Props> = ({
                                                bookCopiesAvailable
}: Props) => {
    const [loggedInUser, setLoggedInUser] = useState<String>(null);
    useEffect(() => {
        // @ts-ignore
        return setLoggedInUser(sessionStorage.getItem("loggedInUser"));
    }, []);

    if (!bookCopiesAvailable) {
        return <div>Loading book details...</div>;
    }

    return (
        <div>
            {bookCopiesAvailable.length > 0 && (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>id</th>
                    <th>Title</th>
                    <th>Status</th>

                </tr>
                </thead>
                <tbody>
                {bookCopiesAvailable.map((bookCopy) => (
                    <tr key={bookCopy.id}>
                        <td>{bookCopy.id}</td>
                        <td>{bookCopy.book.title}</td>
                        <td>
                            <button type="button" className="btn btn-success">
                                Available
                            </button>

                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
                )}
        </div>
    );

}

export default BookCopyAvailable;