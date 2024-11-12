import usersDb from "../repository/user.db";
import { User } from "../model/user";
import bcrypt from "bcrypt";

const getAllUsers = async (): Promise<User[]> => {
    return await usersDb.getAllUsers();
};
const createUser = async (user: User): Promise<User> => {
    console.log(user)
    const existingUser = await usersDb.getUserByEmail(user.getEmail());
    if (existingUser) {
        throw new Error('User already exists');
    }

    await bcrypt.hash(user.getPassword(), 10).then((hash) => {
        user.setPassword(hash);
    }
    );
    return await usersDb.createUser(user);
}
export default {getAllUsers, createUser};