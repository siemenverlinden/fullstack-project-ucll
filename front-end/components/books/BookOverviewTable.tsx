import React, { useEffect, useState } from "react";
import { Book, BookCopy } from "@types";
import BookService from "@services/BookService";
import BookCopyAvailable from "@components/books/view/BookCopyAvailable";

type Props = {
    books: Array<Book>;
    loanBookCopy: (bookCopy: BookCopy) => void;
};

const BooksOverviewTable: React.FC<Props> = ({ books, loanBookCopy }: Props) => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [bookCopiesAvailable, setBookCopiesAvailable] = useState<BookCopy[] | null>(null);

    const selectBook = (book: Book) => {
        setSelectedBook(book);
    };

    const fetchBookCopies = async () => {
        if (selectedBook && selectedBook.id !== undefined) {
            try {
                const response = await BookService.getBookCopiesAvailable(selectedBook.id);

                if (response) {
                    const json = await response.json();
                    setBookCopiesAvailable(json);
                }
            } catch (error) {
                console.error("Error fetching book copies:", error);
                setBookCopiesAvailable([]);
            }
        }
    };

    useEffect(() => {
        if (selectedBook) {
            fetchBookCopies();
        }
    }, [selectedBook]);

    return (
        <div className="join join-vertical w-full">
            {books.map((book) => (
                <div
                    key={book.id}
                    className="collapse collapse-arrow join-item border-base-300 border"
                    onClick={() => selectBook(book)}
                >
                    <input type="radio" name={`my-accordion-${book.id}`} />
                    <div className="collapse-title text-xl font-medium">
                        {book.title} | {book.authors}
                    </div>
                    <div className="collapse-content">
                        {selectedBook && selectedBook.id === book.id && bookCopiesAvailable && (
                            <BookCopyAvailable
                                bookCopiesAvailable={bookCopiesAvailable}
                                loanBookCopy={(bookCopy) => loanBookCopy(bookCopy, fetchBookCopies)}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BooksOverviewTable;
