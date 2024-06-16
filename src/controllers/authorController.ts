import { Request, Response } from 'express';
import * as authorService from '../services/authorService';

export const createAuthor = async (req: Request, res: Response) => {
    try {
        const authorData = req.body;
        const author = await authorService.createAuthor(authorData);
        res.status(201).send(author);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const getAllAuthors = async (req: Request, res: Response) => {
    try {
        const authors = await authorService.getAllAuthors();
        res.status(200).send(authors);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const updateAuthor = async (req: Request, res: Response) => {
    try {
        const authorData = req.body;
        const author = await authorService.updateAuthor(req.params.id, authorData);
        res.status(200).send(author);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const deleteAuthor = async (req: Request, res: Response) => {
    try {
        const author = await authorService.deleteAuthor(req.params.id);
        res.status(200).send(author);
    } catch (err) {
        res.status(500).send(err);
    }
};
