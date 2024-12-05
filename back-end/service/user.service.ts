import usersDb from "../repository/user.db";
import { User } from "../model/user";
import {AuthenticationResponse, UserInput} from "../types";
import bcrypt from "bcrypt";
import { generateJwtToken } from '../util/jwt';
const getAllUsers = async (): Promise<User[]> => {
    return await usersDb.getAllUsers();
};
const createUser = async ({
                              email,
                              password,
    role
}:UserInput): Promise<User> => {
    const existingUser = await usersDb.getUserByEmail(email);

    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword, role: role});

    return await usersDb.createUser(user);
}

const authenticate = async ({ email, password }: UserInput): Promise<{
    role: "admin" | "user";
    email: string;
    token: string
}> => {

    const user = await getUserByEmail({ email });

    if(!user) {
        throw new Error('User does not exist.');
    }
    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    if (user.getId() === undefined) {
        throw new Error('User ID is undefined.');
    }
    // @ts-ignore
    return {
        token: generateJwtToken({ id: user.getId() || '', email: user.getEmail(),role: user.getRole() }),
        email: user.getEmail(),
        role: user.getRole(),
    };
};

const getUserByEmail = async ({ email }: { email: string }): Promise<User> => {
    const user = await usersDb.getUserByEmail( email );
    if (!user) {
        throw new Error(`User with username: ${email} does not exist.`);
    }
    return user;
};
export default {getAllUsers, createUser, getUserByEmail, authenticate};