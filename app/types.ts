export type Task = {
  text: string;
  completed: boolean;
};

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  createdAt: Date;
  updatedAt: Date;
};

export type Note = {
  id: string;
  text: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: { city?: string };
  company?: { name?: string };
};
