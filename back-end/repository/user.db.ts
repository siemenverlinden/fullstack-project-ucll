import {User} from "../model/user";
import {v4 as uuidv4} from "uuid";
import database from '../util/database';
import {Book} from "../model/book";



const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
        });
        return usersPrisma.map((userPrisma  ) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getUserById = async (userId: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                userId: userId
            }
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllUsers,
    getUserById
}