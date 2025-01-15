import jwt from 'jsonwebtoken';
import { Role } from '../types';

const generateJwtToken = ({ id, email,role }: { id:string, email: string,role: string;}): string => {
    const options = { expiresIn: "8h", issuer: 'bibliotheca_app' };
    try {
        return jwt.sign({ id, email,role }, process.env.JWT_SECRET!, options);
    } catch (error) {
        throw new Error('Error generating JWT token.');
    }
};

export { generateJwtToken };
