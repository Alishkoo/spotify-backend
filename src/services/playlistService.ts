import Playlist from '../models/Playlist';
import Music from '../models/Music';

interface PlaylistData {
    title: string;
    description: string;
    songs?: string[];
}

export const createPlaylist = async (playlistData: PlaylistData) => {
    const playlist = new Playlist(playlistData);
    await playlist.save();
    return playlist;
};

export const getAllPlaylists = async () => {
    return await Playlist.find();
};

export const updatePlaylist = async (id: string, playlistData: PlaylistData) => {
    return await Playlist.findByIdAndUpdate(id, playlistData, { new: true });
};

export const deletePlaylist = async (id: string) => {
    const playlist = await Playlist.findByIdAndDelete(id);
    if (playlist) {
        await Music.updateMany({ _id: { $in: playlist.songs } }, { $pull: { playlist: id } });
    }
    return playlist;
};
