import { Router } from 'express';
import * as musicController from '../controllers/musicController';
import { upload } from '../utils/s3';

const router = Router();

router.post('/', upload.single('file'), musicController.uploadMusic);
router.delete('/:id', musicController.deleteMusic);
router.get('/', musicController.getAllMusic);

export default router;
