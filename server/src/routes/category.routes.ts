import { Router } from 'express';
import { CategoryService } from '../services/category.service';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();
const categoryService = new CategoryService();

router.use(authenticate);

router.get('/', async (req, res) => {
    const categories = await categoryService.findAll();
    res.json(categories);
});

router.get('/:id', async (req, res) => {
    const category = await categoryService.findById(req.params.id);
    res.json(category);
});

router.post('/', authorize('ADMIN', 'ORGANIZER'), async (req, res) => {
    const category = await categoryService.create(req.body);
    res.status(201).json(category);
});

router.put('/:id', authorize('ADMIN', 'ORGANIZER'), async (req, res) => {
    const category = await categoryService.update(req.params.id, req.body);
    res.json(category);
});

router.delete('/:id', authorize('ADMIN'), async (req, res) => {
    const result = await categoryService.delete(req.params.id);
    res.json(result);
});

export default router;