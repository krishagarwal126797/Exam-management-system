import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  examName: { type: String, required: true },
  marks: { type: Number, required: true },
  examDate: { type: Date, required: true }
});

export default mongoose.model('Result', resultSchema);
