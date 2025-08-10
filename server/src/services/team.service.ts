import prisma from '../config/database';
import { teamSchema } from '../validators/schemas';

export class TeamService {
    async create(data: any, userId: string) {
        const validated = teamSchema.parse(data);

        return await prisma.team.create({
            data: {
                ...validated,
                userId,
            },
            include: {
                fighters: true,
                _count: {
                    select: { fighters: true }
                }
            }
        });
    }

    async findAll(userId: string, role: string) {
        const where = role === 'ADMIN' ? {} : { userId };

        return await prisma.team.findMany({
            where,
            include: {
                _count: {
                    select: { fighters: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async findById(id: string) {
        const team = await prisma.team.findUnique({
            where: { id },
            include: {
                fighters: {
                    orderBy: { lastName: 'asc' }
                },
                user: {
                    select: { firstName: true, lastName: true, email: true }
                }
            }
        });

        if (!team) {
            throw new Error('Team not found');
        }

        return team;
    }

    async update(id: string, data: any, userId: string, role: string) {
        const validated = teamSchema.parse(data);

        const team = await prisma.team.findUnique({ where: { id } });

        if (!team) {
            throw new Error('Team not found');
        }

        if (role !== 'ADMIN' && team.userId !== userId) {
            throw new Error('Unauthorized');
        }

        return await prisma.team.update({
            where: { id },
            data: validated,
            include: {
                fighters: true,
                _count: {
                    select: { fighters: true }
                }
            }
        });
    }

    async delete(id: string, userId: string, role: string) {
        const team = await prisma.team.findUnique({ where: { id } });

        if (!team) {
            throw new Error('Team not found');
        }

        if (role !== 'ADMIN' && team.userId !== userId) {
            throw new Error('Unauthorized');
        }

        await prisma.team.delete({ where: { id } });
        return { message: 'Team deleted successfully' };
    }
}