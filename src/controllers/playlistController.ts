import { Request, Response } from 'express';
import * as playlistService from '../services/playlistService';

export const createPlaylist = async (req: Request, res: Response) => {
    try {
        const playlistData = req.body;
        const playlist = await playlistService.createPlaylist(playlistData);
        res.status(201).send(playlist);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const getAllPlaylists = async (req: Request, res: Response) => {
    try {
        const playlists = await playlistService.getAllPlaylists();
        res.status(200).send(playlists);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const updatePlaylist = async (req: Request, res: Response) => {
    try {
        const playlistData = req.body;
        const playlist = await playlistService.updatePlaylist(req.params.id, playlistData);
        res.status(200).send(playlist);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const deletePlaylist = async (req: Request, res: Response) => {
    try {
        const playlist = await playlistService.deletePlaylist(req.params.id);
        res.status(200).send(playlist);
    } catch (err) {
        res.status(500).send(err);
    }
};
