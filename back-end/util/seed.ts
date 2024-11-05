// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';
import {create} from "node:domain";

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.deleteMany();
    await prisma.book.deleteMany();
    await prisma.loan.deleteMany({});
    await prisma.admin.deleteMany();

    const user = await prisma.user.create({
        data: {
            password: "user",
            email: 'user@example.com',
            phone: '0612345678',
        },
    });

    const adminUser = await prisma.admin.create({
        data: {
            status: "volunteer",
            user: {
                create: {
                    password: "admin",
                    email: 'admin@example.com',
                    phone: '0612345678',
                },
            },
        },
     });


    const book1 = await prisma.book.create({
        data: {
            title: 'De Ontdekking van de Hemel',
            authors: ['Harry Mulisch'],
            description: 'Roman',
            isbn: '9789023469154',
            totalCopies: 5,
        },
    });

    const book2 = await prisma.book.create({
        data: {
            title: 'Het Diner',
            authors: ['Herman Koch'],
            description: 'Thriller',
            isbn: '9789025433511',
            totalCopies: 3,
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
