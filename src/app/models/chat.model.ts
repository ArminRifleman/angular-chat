export interface Chat {
  id?: string;
  name?: string;
  participants: string[];
  createdAt: Date;
  lastMessage?: string;
  lastMessageTimestamp?: Date;
  unreadCount?: { [userId: string]: number };
}