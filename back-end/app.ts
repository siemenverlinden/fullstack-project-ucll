import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {loanRouter} from "./controller/loan.routes";
import {bookRouter} from "./controller/book.routes";
import {userRouter} from "./controller/user.routes";

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/loans', loanRouter);
app.use('/books', bookRouter);
app.use('/users', userRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});


app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
