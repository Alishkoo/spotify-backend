import { Router } from 'express';
import * as playlistController from '../controllers/playlistController';

const router = Router();

router.post('/', playlistController.createPlaylist);
router.get('/', playlistController.getAllPlaylists);
router.put('/:id', playlistController.updatePlaylist);
router.delete('/:id', playlistController.deletePlaylist);

export default router;
