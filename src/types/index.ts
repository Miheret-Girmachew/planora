export interface Folder {
  id: string;
  name: string;
  description?: string;
  parentId: string | null;
  userId: string;
  createdAt: any;
}