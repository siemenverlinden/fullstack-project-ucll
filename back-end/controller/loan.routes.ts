/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Lecturer:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Lecturer name.
 *            expertise:
 *              type: string
 *              description: Lecturer expertise.
 *      Loan:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: Unique loan identifier.
 *          userId:
 *            type: string
 *            description: ID of the user who created the loan.
 *          bookCopyId:
 *            type: string
 *            description: ID of the book copy on loan.
 *          startDate:
 *            type: string
 *            format: date-time
 *            description: The date the loan started.
 *          endDate:
 *            type: string
 *            format: date-time
 *            description: The date the loan ended.
 *      LoanInput:
 *        type: object
 *        properties:
 *          bookCopyId:
 *            type: string
 *            description: The ID of the book copy to be loaned.
 */

import express, { NextFunction, Request, Response } from 'express';
import loanService from '../service/loan.service';
import { LoanInput, Role } from "../types";

const loanRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Loans
 *   description: API for managing loans
 */

/**
 * @swagger
 * /loans:
 *   get:
 *     summary: Get all loans (admin) or the loans of the current user
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of loans.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 */
loanRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { id:string; email: string; role: Role } };
        const { id, email, role } = request.auth;
        const loans = await loanService.getAllLoans({id, email, role});
        res.status(200).json(loans);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /loans/{id}:
 *   post:
 *     summary: Create a new loan for a given book copy
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the book copy to loan.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The created loan.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 */
loanRouter.post('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { id:string; email: string; role: Role } };
        const { id, email, role } = request.auth;
        const bookCopyId = request.params.id;
        const loan = await loanService.createLoan({bookCopyId,userId:id});
        res.status(200).json(loan);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /loans/{id}:
 *   delete:
 *     summary: Delete a loan by ID. Admins or the user who owns the loan can delete it.
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the loan to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Loan successfully deleted.
 */
loanRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const request = req as Request & { auth: { id:string; email: string; role: Role } };
        const { id: userId, email, role } = request.auth;
        const loan = await loanService.getLoanById(id);
        if (loan === null) {
            res.status(404).json({ message: 'Loan not found.' });
            return;
        }
        if (role === "admin" || loan.user.getId() === userId) {
            await loanService.deleteLoan(id);
            res.status(200).end();
        } else {
            res.status(401).json({ message: 'You are not authorized to delete this loan.' });
            return;
        }
    } catch (error) {
        next(error);
    }
});

export { loanRouter };
