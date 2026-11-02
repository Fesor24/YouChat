import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';

export const generateAccessToken = async (sub: string, email: string) => {
    const secret = process.env['JWT_SECRET'];

    const jwtSecret = new TextEncoder().encode(secret);

    const payload = {
        sub,
        email,
        role: 'user'
    }

    if(!secret)
        throw new Error("JWT secret key missing")

    const token = await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt(new Date())
        .setExpirationTime('30m')
        .sign(jwtSecret)

        return token;

}

export const hashPassword = (password: string, salt: string | null = null): string =>  {

    if(salt == null)
        salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(password, salt);

    return `${hash}:${salt}`
}

export const comparePasswords = (userHashedInput: string, savedPasswordFromDb: string): 
    boolean =>{

    return userHashedInput == savedPasswordFromDb;

}