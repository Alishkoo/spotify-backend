import Music from '../models/Music';
import Playlist from '../models/Playlist';
import Author from '../models/Author';
import { uploadFileToS3, deleteFileFromS3 } from '../utils/s3';

interface MusicData {
    title: string;
    file_link: string;
    image_link: string;
    description: string;
    playlist: string;
    author: string;
    file?: Express.Multer.File;
}

export const uploadMusic = async (musicData: MusicData) => {
    const fileLink = musicData.file ? await uploadFileToS3(musicData.file) : musicData.file_link;

    const music = new Music({
        ...musicData,
        file_link: fileLink
    });
    await music.save();

    await Playlist.findOneAndUpdate({ _id: musicData.playlist }, { $push: { musics: music._id } });
    await Author.findOneAndUpdate({ _id: musicData.author }, { $push: { musics: music._id } });

    return music;
}

export const deleteMusic = async (id: string) => {
    const music = await Music.findByIdAndDelete(id);

    if(music){
        const fileKey = music.file_link.split('/').pop();
        await deleteFileFromS3(fileKey!);

        await Playlist.updateMany({}, { $pull: { musics: music._id } });
        await Author.updateMany({}, { $pull: { musics: music._id } });
    }

    return music;
}

export const getAllMusic = async () => {
    return await Music.find();
}