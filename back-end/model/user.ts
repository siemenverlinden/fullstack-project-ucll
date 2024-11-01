import {Role} from "../types";

export class User {

    private id?: string;
    private email: string;
    private password: string;
    private role: string;
    private created_at: Date;

    constructor(user: {
        id?: string;
        email: string;
        password: string;
        role: Role;
        created_at: Date;
    }) {
        this.validate(user);

        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.created_at = user.created_at;
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
        if (!user.role) {
            throw new Error('Role is required');
        }

    }

    getRole(): string {
        return this.role;
    }
    getCreatedAt(): Date {
        return this.created_at;
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

    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole() &&
            this.created_at === user.getCreatedAt()
        );
    }
}
