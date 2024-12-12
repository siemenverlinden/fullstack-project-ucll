import {Book} from "@types";
import Link from "next/link";
import React, { useState } from 'react';
import BookService from "@services/BookService";

type Props = {
    books: Array<Book>;
};

const AddBook: React.FC<Props> = () => {
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [copies, setCopies] = useState('');
    const [isbn, setIsbn] = useState('');
    const [titleError, setTitleError] = useState<string | null>(null);
    const [authorsError, setAuthorsError] = useState<string | null>(null);
    const [isbnError, setIsbnError] = useState<string | null>(null);
    const clearErrors = () => {
        setTitleError(null);
        setAuthorsError(null);
        setIsbnError(null);
    };

    const validate = (): boolean => {
        let result = true;

        if (!title && title.trim() === '') {
            setTitleError("Title is required");
            result = false;
        }

        if (!authors && authors.trim() === '') {
            setAuthorsError("Authors is required");
            result = false;
        }
        if(!isbn && isbn.trim() === ''){
            setIsbnError("ISBN is required");
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        debugger;
        event.preventDefault();

        clearErrors();

        if (!validate()) {
            return;
        }

        const book = {
            title,
            authors,
            copies,
            isbn
        };


        const response = await BookService.createBook(book);

        // if (response.status === 200) {
        //     setStatusMessages([{ message: 'login.success', type: 'success' }]);
        //
        //     const user = await response.json();
        //     sessionStorage.setItem(
        //         'loggedInUser',
        //         JSON.stringify({
        //             token: user.token,
        //             fullname: user.fullname,
        //             username: user.username,
        //             role: user.role,
        //         })
        //     );
        //     setTimeout(() => {
        //         router.push('/');
        //     }, 2000);
        // } else if (response.status === 401) {
        //     const { errorMessage } = await response.json();
        //     setStatusMessages([{ message: errorMessage, type: 'error' }]);
        // } else {
        //     setStatusMessages([
        //         {
        //             message: t('general.error'),
        //             type: 'error',
        //         },
        //     ]);
        // }
    };

    return (
        <>
            <div className="card w-96 bg-base-100 border m-auto">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold mb-6">Nieuw book</h2>
                    <form>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="title" className="grow"   value={title} onChange={(e) => setTitle(e.target.value)}/>
                            </label>
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Auteur</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="authors" className="grow"
                                       value={authors}
                                       onChange={(e) => setAuthors(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">ISBN</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="isbn" className="grow"
                                       value={isbn}
                                       onChange={(e) => setIsbn(e.target.value)}/>
                            </label>
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Aantal exemplaren</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    type="number"
                                    className="form-control grow"
                                    id="copies"
                                    min="1"
                                    value={copies}
                                    onChange={(e) => setCopies(parseInt(e.target.value))}
                                />
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">
                                Aanmaken
                            </button>
                        </div>
                    </form>

                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Titel</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Voer de titel van het boek in"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Auteur</label>
                    <input
                        type="text"
                        className="form-control"
                        id="authors"
                        placeholder="Voer de naam van de auteur in"
                        value={authors}
                        onChange={(e) => setAuthors(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="isbn" className="form-label">ISBN</label>
                    <input
                        type="text"
                        className="form-control"
                        id="isbn"
                        placeholder="Voer de ISBN in"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="copies" className="form-label">Aantal Exemplaren</label>
                    <input
                        type="number"
                        className="form-control"
                        id="copies"
                        min="1"
                        value={copies}
                        onChange={(e) => setCopies(parseInt(e.target.value))}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Opslaan</button>
            </form>
        </>
    );
};

export default AddBook;
