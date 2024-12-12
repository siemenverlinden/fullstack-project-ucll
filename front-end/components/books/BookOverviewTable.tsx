import React, {useEffect, useState} from "react";
import {Book, BookCopy} from "@types";
import Link from "next/link";
import BookCopyAvailable from "@components/books/view/BookCopyAvailable";
import BookService from "@services/BookService";
type Props = {
    books: Array<Book>;
};

const BooksOverviewTable: React.FC<Props> = ({
    books,
}: Props) => {


    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const selectBook = (book: Book) => {
        setSelectedBook(book);

    };

    const fetchBookCopies = async () => {
        if (selectedBook && selectedBook.id !== undefined) {
            try {
                const response = await BookService.getBookCopiesAvailable(selectedBook.id);
                if (!response.ok) {
                    console.log('wrong response')

                } if(response) {
                    const json = await response.json();
                    setBookCopiesAvailable(json);
                }

            } catch (error) {
                console.error("Error fetching book copies:", error);
                setBookCopiesAvailable([]); // Set an empty list on error
            }
        }
    };

    const [bookCopiesAvailable, setBookCopiesAvailable] = useState<BookCopy[] | null>(null);

    useEffect(() => {
        if(selectedBook) {

            fetchBookCopies();
        }

    }, [selectedBook]);

    return (
        <>
            <div className="join join-vertical w-full">

                {books.map((book) => (
                    <div key={book.id} className="collapse collapse-arrow join-item border-base-300 border"
                         onClick={() => selectBook(book)}>
                        <input type="radio" name={`my-accordion-${book.id}`}/>
                        <div className="collapse-title text-xl font-medium">{book.title} | {book.authors}
                        </div>

                        <div className="collapse-content">

                            {selectedBook && selectedBook.id === book.id && bookCopiesAvailable && (

                                <BookCopyAvailable bookCopiesAvailable={bookCopiesAvailable} />
                            )}
                        </div>

                    </div>
                ))}

            </div>




        </>
    );
};

export default BooksOverviewTable;
