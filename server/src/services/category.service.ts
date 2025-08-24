import prisma from '../config/database';
import { categorySchema } from '../validators/schemas';

export class CategoryService {
  async create(data: any) {
    const validated = categorySchema.parse(data);
    
    return await prisma.category.create({
      data: validated,
    });
  }

  async findAll() {
    return await prisma.category.findMany({
      where: { isActive: true },
      orderBy: [
        { style: 'asc' },
        { gender: 'asc' },
        { ageMin: 'asc' },
        { weightMin: 'asc' }
      ]
    });
  }

  async findById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        registrations: {
          include: {
            fighter: {
              include: {
                team: true
              }
            }
          }
        }
      }
    });

    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  }

  async update(id: string, data: any) {
    const validated = categorySchema.parse(data);
    
    return await prisma.category.update({
      where: { id },
      data: validated,
    });
  }

  async delete(id: string) {
    await prisma.category.update({
      where: { id },
      data: { isActive: false }
    });
    return { message: 'Category deactivated successfully' };
  }
}