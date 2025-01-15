// Execute:
//  npx prisma migrate dev
//  npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();

const main = async () => {
    await prisma.loan.deleteMany({});
    await prisma.bookCopy.deleteMany({});
    await prisma.user.deleteMany();
    await prisma.book.deleteMany()

    const user = await prisma.user.create({
        data: {
            password: await bcrypt.hash('user123', 12),
            email: 'user@example.com',
            role: 'user',
        },
    });

    const adminUser = await prisma.user.create({
        data: {
            password: await bcrypt.hash('admin123', 12),
            email: 'admin@example.com',
            role: 'admin',
        },
     });

    const books = [
        {
            title: 'De Ontdekking van de Hemel',
            authors: 'Harry Mulisch',
            isbn: '9789023469154',
        },
        {
            title: 'Het Diner',
            authors: 'Herman Koch',
            isbn: '9789023457243',
        },
        {
            title: 'De Brief voor de Koning',
            authors: 'Tonke Dragt',
            isbn: '9789025317026',
        },
        {
            title: 'Max Havelaar',
            authors: 'Multatuli',
            isbn: '9789028240307',
        },
        {
            title: 'De Aanslag',
            authors: 'Harry Mulisch',
            isbn: '9789023428878',
        },
    ];

    for (const book of books) {
        const createdBook = await prisma.book.create({
            data: {
                title: book.title,
                authors: book.authors,
                isbn: book.isbn,
            },
        });

        for (let i = 0; i < 3; i++) {
            await prisma.bookCopy.create({
                data: {
                    book: {
                        connect: {
                            id: createdBook.id,
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
                        },
                    },
                },
            });
        }
    }


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
