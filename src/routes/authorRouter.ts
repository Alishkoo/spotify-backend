import { Router } from 'express';
import * as authorController from '../controllers/authorController';

const router = Router();

router.post('/', authorController.createAuthor);
router.get('/', authorController.getAllAuthors);
router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

export default router;
