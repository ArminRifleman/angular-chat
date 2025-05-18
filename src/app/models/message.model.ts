export interface Message {
  id?: string;
  chatId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  read: boolean;
}