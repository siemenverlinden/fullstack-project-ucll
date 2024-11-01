
import {User} from "./user";

export class Member {

    private id?: string;
    private user: User;
    private phone: string;

    constructor(member: {
        id?: string;
        user: User;
        phone: string;
    }) {

        this.id = member.id;
        this.user = member.user;
        this.phone = member.phone;
    }

    getUser(): User {
        return this.user;
    }

    getId(): string | undefined {
        return this.id;
    }

    getPhone(): string {
        return this.phone;
    }

    equals(member: Member): boolean {
        return (
            this.id === member.getId() &&
            this.user.equals(member.getUser()) &&
            this.phone === member.getPhone()
        );
    }
}
