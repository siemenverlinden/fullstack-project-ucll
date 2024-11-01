import membersDb from "../repository/members.db";
import { Member } from "../model/member";

const getAllMembers = ():Member[] => membersDb.getAllMembers();

export default {getAllMembers};