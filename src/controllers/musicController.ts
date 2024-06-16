import {Request, Response} from 'express';
import * as musicService from '../services/musicService';

export const uploadMusic = async (req: Request, res: Response) => {
    try{    
        const file = req.file;
        const musicData = {
            title: req.body.title,
            file_link: "",
            image_link: req.body.image_link,
            description: req.body.description,
            playlist: req.body.playlist,
            author: req.body.author,
            file: file
        }

        const music = await musicService.uploadMusic(musicData);
        res.status(201).send(music);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const deleteMusic = async(req: Request, res: Response) => {
    try {
        const music = await musicService.deleteMusic(req.params.id);
        res.status(200).send(music);
    } catch (err) {
        res.status(500).send(err);
    }
}

export const getAllMusic = async (req: Request, res: Response) => {
    try {
        const music = await musicService.getAllMusic();
        res.status(200).send(music);
    } catch (err) {
        res.status(500).send(err);
    }
};

