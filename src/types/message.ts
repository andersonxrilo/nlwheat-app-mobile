import { UserType } from "./user";

type MessageType = {
  id: string;
  text: string;
  created_at: string;
  user: UserType;
};

export type { MessageType };
