
import {User} from "./user";

export class Admin {

    private id?: string;
    private user: User;

    constructor(admin: {
        id?: string;
        user: User;
    }) {

        this.id = admin.id;
        this.user = admin.user;
    }

    getUser(): User {
        return this.user;
    }

    getId(): string | undefined {
        return this.id;
    }

    
    equals(member: Admin): boolean {
        return (
            this.id === member.getId() &&
            this.user.equals(member.getUser())
        );
    }
}
