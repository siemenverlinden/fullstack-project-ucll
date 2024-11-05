import {Role} from "../types";
import { User as UserPrisma } from '@prisma/client';

export class User {

    private userId?: string;
    private email: string;
    private password: string;
    private createdAt: Date;

    constructor(user: {
        userId?: string;
        email: string;
        password: string;
        createdAt: Date;
    }) {
        this.validate(user);

        this.userId = user.userId;
        this.email = user.email;
        this.password = user.password;
        this.createdAt = user.createdAt;
    }

    validate(user: {
        email: string;
        password: string;
    }) {
        if (!user.email.trim()) {
            throw new Error('Email is required');
        }
        if (!user.password.trim()) {
            throw new Error('Password is required');
        }

    }

    getCreatedAt(): Date {
        return this.createdAt;
    }
    getUserId(): string | undefined {
        return this.userId;
    }
    getEmail(): string {
        return this.email;
    }
    getPassword(): string {
        return this.password;
    }

    equals(user: User): boolean {
        return (
            this.userId === user.getUserId() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.createdAt === user.getCreatedAt()
        );
    }
    static from({
        userId,
        email,
        password,
        createdAt,
    }: UserPrisma) {
        return new User({
            userId,
            email,
            password,
            createdAt,
        });

                }
}
