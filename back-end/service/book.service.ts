
import { Book } from '../model/book';
import bookDb from '../repository/book.db';

import { BookInput } from '../types';
import bookCopyDb from "../repository/bookCopy.db";

const getAllBooks = async (): Promise<Book[]> => bookDb.getAllBooks();

const createBook = async (book: BookInput): Promise<Book> => {


    const newBook = new Book(
        {
            title: book.title,
            authors: book.authors,
            isbn: book.isbn,
        }
    );



   const NewBook =  await bookDb.createBook(newBook);
    const newId = NewBook.getId();
   if(newId === undefined){
         throw new Error('Book not created');
   }

    const copies = book.copies;
    for (let i = 0; i < copies; i++) {
            await bookCopyDb.createBookCopy(newId);
    }


    return newBook;

}

const getBookById = async (id: string): Promise<Book | null> => bookDb.getBookById({ id });



export default { getAllBooks,createBook,getBookById };
