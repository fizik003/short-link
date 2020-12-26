export interface User {
  email: String;
  password: String;
}

export interface UserReg {
  name: string;
  email: string;
  password: string;
}

export interface Link {
  originLink: string;
  description: string;
}

export interface LinkFromServer {
  id: number;
  originLink: string;
  newLink: string;
  description: string;
  clicks: number;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  author: boolean;
}
