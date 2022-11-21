import { model, Schema } from "mongoose";
import { Infraction } from "../types";

export interface UserProps {
  userId: string;
  guildId: string;
  infractions: Infraction[]
}

export default model("Users", new Schema<UserProps>({
  guildId: { type: String },
  userId: { type: String },
  infractions: [{ type: Object }]
}))