export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isOnline?: boolean;
  lastActive?: Date;
}