import usersDb from "../repository/user.db";
import { User } from "../model/user";

const getAllUsers = async (): Promise<User[]> => {
    return usersDb.getAllUsers();
};
export default {getAllUsers};