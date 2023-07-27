import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  mode: { type: Boolean, required: true },
  link: { type: String },
  whosadmin: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  studentsRegistered: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
});

const Event = model('Event', eventSchema);

export default Event;
