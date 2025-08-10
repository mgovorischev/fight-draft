import { Router } from 'express';
import { FighterService } from '../services/fighter.service';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const fighterService = new FighterService();

router.use(authenticate);

router.get('/', async (req, res) => {
    const fighters = await fighterService.findAll();
    res.json(fighters);
});

router.get('/team/:teamId', async (req, res) => {
    const fighters = await fighterService.findByTeam(req.params.teamId);
    res.json(fighters);
});

router.get('/:id', async (req, res) => {
    const fighter = await fighterService.findById(req.params.id);
    res.json(fighter);
});

router.post('/', async (req, res) => {
    const fighter = await fighterService.create(req.body);
    res.status(201).json(fighter);
});

router.put('/:id', async (req, res) => {
    const fighter = await fighterService.update(req.params.id, req.body);
    res.json(fighter);
});

router.delete('/:id', async (req, res) => {
    const result = await fighterService.delete(req.params.id);
    res.json(result);
});

export default router;