// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';
import {create} from "node:domain";
import {v4 as uuidv4} from "uuid";

const prisma = new PrismaClient();

const main = async () => {
    await prisma.loan.deleteMany({});
    await prisma.bookCopy.deleteMany({});
    await prisma.user.deleteMany();
    await prisma.book.deleteMany()

    const user = await prisma.user.create({
        data: {
            password: "user",
            email: 'user@example.com',
            phone: '0612345678',
        },
    });

    const adminUser = await prisma.user.create({
        data: {
            password: "admin",
            email: 'admin@example.com',
            phone: '0612345678',
            admin: true
        },
     });



    const book1 = await prisma.book.create({
        data: {
            title: 'De Ontdekking van de Hemel',
            authors: 'Harry Mulisch',
            isbn: '9789023469154',
        },
    });



    const book2 = await prisma.book.create({
        data: {
            title: 'Het Diner',
            authors: 'Herman Koch',
            isbn: '9789025433511',
        },
    });

    const bookCopy1 = await prisma.bookCopy.create({
        data: {
            book: {
                connect: {
                    id: book1.id,
                },
            },
            loan: {
                create: {
                    borrowDate: new Date(),
                    dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
            }
        },
        },
    });
    

};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
