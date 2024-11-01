import { Member} from "../model/member";
import {User} from "../model/user";
import {v4 as uuidv4} from "uuid";

const members = [
    new Member({
        id:  uuidv4(),
        user: new User({
            id: uuidv4(),
            email: "john@mail.com",
            password: "password",
            role: "member",
            created_at: new Date("2021-01-01"),
        }),
        phone: "123456789",
    }),
    new Member({
        id: uuidv4(),
        user: new User({
            id: uuidv4(),
            email: "jane@mail.com",
            password: "password",
            role: "member",
            created_at: new Date("2022-01-01"),
        }),
        phone: "123456789",
    }),
];

const getAllMembers = (): Member[] => members;


const getMemberById = ({ id }: { id: string }): Member | null => {
    return members.find((member) => member.getId() === id) || null;
}
const getMemberByEmail = ({ email }: { email: string }): Member | null => {
    return members.find((member) => member.getUser().getEmail() === email) || null;
}

export default {
    getAllMembers,
    getMemberById,
    getMemberByEmail,
}