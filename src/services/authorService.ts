import Author from '../models/Author';
import Music from '../models/Music';

interface AuthorData {
    name: string;
    description: string;
    image_link: string;
    songs?: string[];
}

export const createAuthor = async (authorData: AuthorData) => {
    const author = new Author(authorData);
    await author.save();
    return author;
};

export const getAllAuthors = async () => {
    return await Author.find();
};


export const updateAuthor = async (id: string, authorData: AuthorData) => {
    return await Author.findByIdAndUpdate(id, authorData, { new: true });
};


export const deleteAuthor = async (id: string) => {
    const author = await Author.findByIdAndDelete(id);
    if (author) {
        await Music.updateMany({ _id: { $in: author.songs } }, { $pull: { author: id } });
    }
    return author;
};