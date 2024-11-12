import React, {useEffect, useState} from "react";
import {BookCopy} from "@types";
import Link from "next/link";
type Props = {
    bookCopiesLoaned: BookCopy[];
};
const BookCopyLoaned: React.FC<Props> = ({
                                             bookCopiesLoaned
}: Props) => {
    const [loggedInUser, setLoggedInUser] = useState<String>(null);
    useEffect(() => {
        // @ts-ignore
        return setLoggedInUser(sessionStorage.getItem("loggedInUser"));
    }, []);

    if (!bookCopiesLoaned) {
        return <div>Loading book details...</div>;
    }
console.log(bookCopiesLoaned)
    return (
        <div>
            {bookCopiesLoaned.length > 0 && (

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>id</th>
                    <th>Title</th>
                    <th>Status</th>

                </tr>
                </thead>
                <tbody>
                {bookCopiesLoaned.map((bookCopy) => (
                    <tr key={bookCopy.id}>
                        <td>{bookCopy.id}</td>
                        <td>{bookCopy.book.title}</td>
                        <td>
                            <button type="button" className="btn btn-danger">
                                Loaned
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

export default BookCopyLoaned;
