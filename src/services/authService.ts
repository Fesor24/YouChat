import { SignJWT } from 'jose';

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