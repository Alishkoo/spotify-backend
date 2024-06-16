import mongoose, { Document, Schema } from 'mongoose'

export interface IMusic extends Document {
  title: string,
  file_link: string,
  image_link: string,
  description: string,
	playlist: string,
  author: string
}

const MusicSchema: Schema = new Schema({
  title: { type: String, required: true },
  file_link: { type: String, required: true },
  image_link: { type: String, required: true },
  description: { type: String, required: true },
  playlist: { type: Schema.Types.ObjectId, ref: 'Playlist', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true }
}, { timestamps: true });

export default mongoose.model<IMusic>('Music', MusicSchema)