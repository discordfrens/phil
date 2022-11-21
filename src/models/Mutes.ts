import { model, Schema } from "mongoose";
export interface MuteProps {
  userId: string;
  guildId: string;
  roles: string[];
  length: number;
  reason: string;
  id: string;
  setAt: number;
  messageUrl: string;
  perminate?: boolean;
}

export default model("Mutes", new Schema<MuteProps>({
  guildId: { type: String },
  userId: { type: String },
  id: { type: String },
  reason: { type: String },
  length: { type: Number },
  setAt: { type: Number },
  roles: [{ type: String }],
  messageUrl: { type: String },
  perminate: { type: Boolean, default: false }
}))