import { model, Schema } from "mongoose";
export interface UserProps {
  userId: string;
  guildId: string;
}

export default model("Users", new Schema<UserProps>({
  guildId: { type: String },
  userId: { type: String },
}))