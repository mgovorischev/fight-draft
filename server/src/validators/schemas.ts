import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    organization: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const teamSchema = z.object({
    name: z.string().min(1),
    city: z.string().optional(),
    country: z.string().optional(),
    coachName: z.string().optional(),
    coachPhone: z.string().optional(),
    coachEmail: z.string().email().optional().or(z.literal('')),
});

export const fighterSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    dateOfBirth: z.string().datetime(),
    gender: z.enum(['MALE', 'FEMALE']),
    weight: z.number().positive(),
    height: z.number().positive().optional(),
    experience: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'PROFESSIONAL']),
    teamId: z.string().uuid(),
});

export const categorySchema = z.object({
    name: z.string().min(1),
    style: z.enum(['FULL_CONTACT', 'LIGHT_CONTACT', 'KICK_LIGHT', 'LOW_KICK', 'K1','POINT_FIGHTING', 'MUSICAL_FORMS']),
    ageMin: z.number().int().positive(),
    ageMax: z.number().int().positive(),
    weightMin: z.number().positive(),
    weightMax: z.number().positive(),
    gender: z.enum(['MALE', 'FEMALE']),
    experience: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'PROFESSIONAL']).optional(),
    description: z.string().optional(),
});