import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
  name: { type: String, required: true },
  USN: { type: String, required: true},
  email: { type: String},
  phoneNo: { type: String, required: true },
  branch: { type: String, required: true },
  college: { type: String, required: true },
  passoutYear: { type: Number, required: true },
  appliedEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
});

const Student = model('Student', studentSchema);

export default Student;
