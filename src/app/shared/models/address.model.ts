import { User } from "./user.model";

export interface Address {
  id?: number;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  user?: User;
  userId?: number;
}