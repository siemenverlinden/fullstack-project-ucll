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
 */
import express, { NextFunction, Request, Response } from 'express';
import loanService from '../service/loan.service';
import {LoanInput, Role, UserInput} from "../types";


const loanRouter = express.Router();

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
loanRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const request = req as Request & { auth: { id:string; email: string; role: Role } };
        const { id, email, role } = request.auth;
console.log( request.auth)
            const loans = await loanService.getAllLoans({id, email,role});
            res.status(200).json(loans);


    } catch (error) {
        next(error);
    }
});
loanRouter.post('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { id:string; email: string; role: Role } };
        const { id, email, role } = request.auth;
        const bookCopyId = request.params.id;
        console.log("post")
console.log(request)
        console.log(id)
        const loan = await loanService.createLoan({bookCopyId,userId:id});
        res.status(201).json(loan);
    } catch (error) {
        next(error);
    }
}
);



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
        console.log(loan)
        console.log(loan.user.getId())
        console.log(userId)
        if (role === "admin" || loan.user.getId() === userId) {
            await loanService.deleteLoan(id);
            res.status(204).end();

        }else{
            res.status(401).json({ message: 'You are not authorized to delete this loan.' });
            return;
        }

    } catch (error) {
        next(error);
    }
});

export { loanRouter };
