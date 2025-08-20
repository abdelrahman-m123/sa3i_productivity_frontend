export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed?: boolean;
  priority?: "low" | "medium" | "high"; // restricts to allowed values
  category?: string;
  userId?: string;
  createdAt?: string; 
  __v?: number;
}
