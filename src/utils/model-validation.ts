import z from 'zod';

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 8 characters")
})

export const registerSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 8 characters"),
    firstName: z.string().min(1, "First name must be at least 1 character"),
    lastName: z.string().min(1, "First name must be at least 1 character")
})

export const validators = {
    login: loginSchema,
    register: registerSchema
}