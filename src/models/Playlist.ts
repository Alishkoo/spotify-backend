import mongoose, { Document, Schema } from 'mongoose'

export interface IPlaylist extends Document {
    title: string,
    description: string,
    songs: string[]
}

const PlaylistSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    songs: [{ type: Schema.Types.ObjectId, ref: 'Music' }]
}, { timestamps: true });


export default mongoose.model<IPlaylist>('Playlist', PlaylistSchema)