
import express, { NextFunction, Request, Response } from 'express';
import bookservice from '../service/book.service';
import {BookInput} from "../types";
import bookCopyService from "../service/bookCopy.service";

const bookRouter = express.Router();

/**
 * @swagger
 * /lecturers:
 *   get:
 *     summary: Get a list of all lecturers.
 *     responses:
 *       200:
 *         description: A list of lecturers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Lecturer'
 */
bookRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await bookservice.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
});

bookRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = <BookInput>req.body;
        const result = await bookservice.createBook(book);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

bookRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await bookservice.getBookById(String(req.params.id));
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
});

bookRouter.get('/:id/copies/available', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await bookCopyService.getAvailableCopiesByBookId(String(req.params.id));
        res.status(200).json(book);
    } catch (error) {

        next(error);
    }
});

bookRouter.get('/:id/copies/loaned', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await bookCopyService.getLoanedCopiesByBookId(String(req.params.id));
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
});

bookRouter.post('/:id/copy', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await bookCopyService.createBookCopy(String(req.params.id));
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
});

export { bookRouter };
