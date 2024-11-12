import {Role} from "../types";
import { User as UserPrisma } from '@prisma/client';

export class User {

    private id?: string;
    private email: string;
    private password: string;
    private createdAt: Date;

    constructor(user: {
        id?: string;
        email: string;
        password: string;
        createdAt: Date;
    }) {
        this.validate(user);

        this.id = user.id;
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
    getId(): string | undefined {
        return this.id;
    }
    getEmail(): string {
        return this.email;
    }
    getPassword(): string {
        return this.password;
    }

    setPassword(password: string) {
        this.password = password;
    }
    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.createdAt === user.getCreatedAt()
        );
    }
    static from({
        id,
        email,
        password,
        createdAt,
    }: UserPrisma) {
        return new User({
            id,
            email,
            password,
            createdAt,
        });

                }
}
