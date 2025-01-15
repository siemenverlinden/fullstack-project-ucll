import { StatusMessage} from "@types";
import React, { useState } from 'react';
import BookService from "@services/BookService";
import {useTranslation} from "next-i18next";


const AddBook: React.FC = () => {

    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [copies, setCopies] = useState('');
    const [isbn, setIsbn] = useState('');
    const [titleError, setTitleError] = useState<string | null>(null);
    const [authorsError, setAuthorsError] = useState<string | null>(null);
    const [isbnError, setIsbnError] = useState<string | null>(null);

    const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

    const clearErrors = () => {
        setTitleError(null);
        setAuthorsError(null);
        setIsbnError(null);
        setStatusMessage(null);
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
        if (response.status === 200) {
            setStatusMessage({message: "Book created", type: "success"});
        }else{
            setStatusMessage({message: "Book not created", type: "error"});
        }
            const data = await response.json();
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
                    <h2 className="card-title text-2xl font-bold mb-6"> {t('book.add')}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">{t('book.title')}</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="title" className="grow"   value={title} onChange={(e) => setTitle(e.target.value)}/>
                            </label>
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">{t('book.author')}</span>
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
                                <span className="label-text">{t('app.copy.amount')}</span>
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
                                {t('book.create')}
                            </button>
                        </div>
                    </form>

                </div>
            </div>

        </>
    );
};

export default AddBook;
