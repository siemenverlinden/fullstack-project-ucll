import {Role} from "../types";
import { User as UserPrisma } from '@prisma/client';

export class User {

    private id?: string;
    private email: string;
    private password: string;
    private role: Role;
    constructor(user: {
        id?: string;
        email: string;
        password: string;
        role: Role;
    }) {
        this.validate(user);

        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    validate(user: {
        email: string;
        password: string;
        role: Role;
    }) {
        if (!user.email.trim()) {
            throw new Error('Email is required');
        }
        if (!user.password.trim()) {
            throw new Error('Password is required');
        }
        if (!user.role.trim()) {
            throw new Error('Role is required');
        }

    }

    setRole(role: Role) {
        this.role = role;
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


    getRole(): Role {
        return this.role;
    }
    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        );
    }
    static from({
        id,
        email,
        password,
        role,
    }: UserPrisma) {
        return new User({
            id,
            email,
            password,
            role: role as Role,
        });

                }
}
