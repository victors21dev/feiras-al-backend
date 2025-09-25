import mongoose, { Schema } from "mongoose";
export interface IEvent {
  title: string;
  description: string;
  date: Date;
  location: string;
  createdAt: Date;
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IEvent>("Event", EventSchema);