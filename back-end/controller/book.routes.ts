import express, { NextFunction, Request, Response } from 'express';
import bookservice from '../service/book.service';
import {BookInput} from "../types";
import bookCopyService from "../service/bookCopy.service";

const bookRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing books
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the book.
 *         title:
 *           type: string
 *           description: The title of the book.
 *         authors:
 *           type: string
 *           description: The author of the book.
 *         isbn:
 *           type: string
 *           description: The ISBN of the book.
 *         publishedDate:
 *           type: string
 *           format: date
 *           description: The publication date of the book.
 *     BookInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the book.
 *           example: "The Great Gatsby"
 *         authors:
 *           type: string
 *           description: The author of the book.
 *           example: "F. Scott Fitzgerald"
 *         isbn:
 *           type: string
 *           description: The ISBN of the book.
 *           example: "978-3-16-148410-0"
 *         publishedDate:
 *           type: string
 *           format: date
 *           description: The publication date of the book.
 *           example: "1925-04-10"
 *     BookCopy:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the book copy.
 *         bookId:
 *           type: string
 *           description: The ID of the associated book.
 *         status:
 *           type: string
 *           description: The status of the book copy (e.g., "available", "loaned").
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get a list of all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Book'
 */
bookRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await bookservice.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
bookRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = <BookInput>req.body;
        const result = await bookservice.createBook(book);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the book.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
bookRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await bookservice.getBookById(String(req.params.id));
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /books/{id}/copies/available:
 *   get:
 *     summary: Get all available copies of a specific book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the book.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of available book copies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/BookCopy'
 */
bookRouter.get('/:id/copies/available', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await bookCopyService.getAvailableCopiesByBookId(String(req.params.id));
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /books/{id}/copies/loaned:
 *   get:
 *     summary: Get all loaned copies of a specific book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the book.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of loaned book copies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/BookCopy'
 */
bookRouter.get('/:id/copies/loaned', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await bookCopyService.getLoanedCopiesByBookId(String(req.params.id));
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /books/{id}/copy:
 *   post:
 *     summary: Create a new copy of a specific book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the book to which a copy is to be added.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The created book copy.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookCopy'
 */
bookRouter.post('/:id/copy', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await bookCopyService.createBookCopy(String(req.params.id));
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
});

export { bookRouter };
