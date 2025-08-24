import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@kickboxing.com' },
        update: {},
        create: {
            email: 'admin@kickboxing.com',
            password: adminPassword,
            firstName: 'Admin',
            lastName: 'User',
            role: 'ADMIN',
            organization: 'Kickboxing Federation',
        },
    });

    const managerPassword = await bcrypt.hash('manager123', 10);
    const manager = await prisma.user.upsert({
        where: { email: 'manager@dragons.com' },
        update: {},
        create: {
            email: 'manager@dragons.com',
            password: managerPassword,
            firstName: 'John',
            lastName: 'Coach',
            role: 'TEAM_MANAGER',
            organization: 'Dragons Fight Club',
        },
    });

    const team = await prisma.team.create({
        data: {
            name: 'Dragons Fight Club',
            city: 'New York',
            country: 'USA',
            coachName: 'John Coach',
            coachEmail: 'manager@dragons.com',
            userId: manager.id,
            fighters: {
                create: [
                    {
                        firstName: 'Mike',
                        lastName: 'Johnson',
                        dateOfBirth: new Date('2000-05-15'),
                        gender: 'MALE',
                        weight: 75,
                        height: 180,
                        experience: 'INTERMEDIATE',
                    },
                    {
                        firstName: 'Sarah',
                        lastName: 'Williams',
                        dateOfBirth: new Date('2002-08-22'),
                        gender: 'FEMALE',
                        weight: 60,
                        height: 165,
                        experience: 'ADVANCED',
                    },
                ],
            },
        },
    });

    const categories = await prisma.category.createMany({
        data: [
            {
                name: 'Junior Male Light Contact 60-65kg',
                style: 'LIGHT_CONTACT',
                ageMin: 16,
                ageMax: 18,
                weightMin: 60,
                weightMax: 65,
                gender: 'MALE',
            },
            {
                name: 'Senior Female Full Contact 55-60kg',
                style: 'FULL_CONTACT',
                ageMin: 18,
                ageMax: 35,
                weightMin: 55,
                weightMax: 60,
                gender: 'FEMALE',
            },
            {
                name: 'Senior Male Full Contact 70-75kg',
                style: 'FULL_CONTACT',
                ageMin: 18,
                ageMax: 35,
                weightMin: 70,
                weightMax: 75,
                gender: 'MALE',
            },
        ],
    });

    console.log('Database seeded successfully');
    console.log('Admin login: admin@kickboxing.com / admin123');
    console.log('Manager login: manager@dragons.com / manager123');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });