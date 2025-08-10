import prisma from '../config/database';
import { fighterSchema } from '../validators/schemas';

export class FighterService {
    async create(data: any) {
        const validated = fighterSchema.parse(data);

        return await prisma.fighter.create({
            data: {
                ...validated,
                dateOfBirth: new Date(validated.dateOfBirth),
            },
            include: {
                team: true,
            }
        });
    }

    async findAll() {
        return await prisma.fighter.findMany({
            include: {
                team: true,
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async findByTeam(teamId: string) {
        return await prisma.fighter.findMany({
            where: { teamId },
            include: {
                team: true,
            },
            orderBy: { lastName: 'asc' }
        });
    }

    async findById(id: string) {
        const fighter = await prisma.fighter.findUnique({
            where: { id },
            include: {
                team: true,
                registrations: {
                    include: {
                        category: true,
                    }
                }
            }
        });

        if (!fighter) {
            throw new Error('Fighter not found');
        }

        return fighter;
    }

    async update(id: string, data: any) {
        const validated = fighterSchema.parse(data);

        return await prisma.fighter.update({
            where: { id },
            data: {
                ...validated,
                dateOfBirth: new Date(validated.dateOfBirth),
            },
            include: {
                team: true,
            }
        });
    }

    async delete(id: string) {
        await prisma.fighter.delete({ where: { id } });
        return { message: 'Fighter deleted successfully' };
    }
}