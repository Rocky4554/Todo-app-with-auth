import mongoose, { Document, Schema } from 'mongoose';

export interface IErrorLog extends Document {
  message: string;
  stack?: string;
  endpoint: string;
  method: string;
  statusCode: number;
  userId?: string;
  timestamp: Date;
}

const ErrorLogSchema: Schema = new Schema({
  message: {
    type: String,
    required: true
  },
  stack: String,
  endpoint: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  statusCode: {
    type: Number,
    required: true
  },
  userId: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IErrorLog>('ErrorLog', ErrorLogSchema);