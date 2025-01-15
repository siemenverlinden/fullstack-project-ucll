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

const getUserById = async (id: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                id: id,
            },
        });
        if (userPrisma) {
            return User.from(userPrisma);
        }
        return null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}
const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: {
                email: email,
            },
        });
        if (userPrisma) {
            return User.from(userPrisma);
        }
        return null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}
const update = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.update({
            where: {
                id: user.getId(),
            },
            data: {
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole(),
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}
const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole(),
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}
const deleteUser = async (id: string): Promise<void> => {
    console.log(id)
    try {
        await database.user.delete({
            where: {
                id: id,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}
export default {
    getAllUsers,
    createUser,
    getUserByEmail,
    getUserById,
    update,
    deleteUser
}