import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { registerSchema, loginSchema } from '../validators/schemas';

export class AuthService {
    async register(data: any) {
        const validated = registerSchema.parse(data);

        const exists = await prisma.user.findUnique({
            where: { email: validated.email }
        });

        if (exists) {
            throw new Error('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(validated.password, 10);

        const user = await prisma.user.create({
            data: {
                ...validated,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
            }
        });

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        return { user, token };
    }

    async login(data: any) {
        const validated = loginSchema.parse(data);

        const user = await prisma.user.findUnique({
            where: { email: validated.email }
        });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const validPassword = await bcrypt.compare(validated.password, user.password);

        if (!validPassword) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        const { password, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, token };
    }
}