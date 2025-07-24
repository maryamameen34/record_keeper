import mongoose, { Schema, Document, model } from 'mongoose';

interface IRecord extends Document {
  title: string;
  start : Date ;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const RecordSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    start : {type : Date  , required : true},
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Record || model<IRecord>('Record', RecordSchema);
