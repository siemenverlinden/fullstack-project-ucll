
import express, { NextFunction, Request, Response } from 'express';
import bookservice from '../service/book.service';

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


export { bookRouter };
