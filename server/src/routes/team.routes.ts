import { Router } from 'express';
import { TeamService } from '../services/team.service';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';

const router = Router();
const teamService = new TeamService();

router.use(authenticate);

router.get('/', async (req: AuthRequest, res) => {
    const teams = await teamService.findAll(req.user.id, req.user.role);
    res.json(teams);
});

router.get('/:id', async (req, res) => {
    const team = await teamService.findById(req.params.id);
    res.json(team);
});

router.post('/', async (req: AuthRequest, res) => {
    const team = await teamService.create(req.body, req.user.id);
    res.status(201).json(team);
});

router.put('/:id', async (req: AuthRequest, res) => {
    const team = await teamService.update(
        req.params.id,
        req.body,
        req.user.id,
        req.user.role
    );
    res.json(team);
});

router.delete('/:id', async (req: AuthRequest, res) => {
    const result = await teamService.delete(
        req.params.id,
        req.user.id,
        req.user.role
    );
    res.json(result);
});

export default router;