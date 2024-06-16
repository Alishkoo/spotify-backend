import mongoose, {Document, Schema} from "mongoose";

export interface IAuthor extends Document {
	name: string,
	description: string,
	image_link: string,
	songs: string[]
}

const AuthorSchema: Schema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	image_link: { type: String, required: true },
	songs: [{ type: Schema.Types.ObjectId, ref: 'Music' }]
}, { timestamps: true });

export default mongoose.model<IAuthor>('Author', AuthorSchema)