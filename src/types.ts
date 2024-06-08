// types.ts

export interface AddUserInput {
    name: string;
    email: string;
    role: string;
  }
  
  export interface UpdateUserInput {
    name?: string;
    email?: string;
    role?: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
  