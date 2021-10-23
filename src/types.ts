type MessageType = {
  id: string;
  text: string;
  created_at: string;
  user: UserType;
};
type UserType = {
  name: string;
  login: string;
  avatar_url: string;
  id: string;
};

export type { MessageType, UserType };
