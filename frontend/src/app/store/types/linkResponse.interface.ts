import { TagResponseInterface } from './tagResponse.interface';
export interface LinkResponseInterface {
  id: number;
  originLink: string;
  newLink: string;
  description: string;
  clicks: number;
  code: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  Tags?: TagResponseInterface[];
  LinkTag?: {
    linkId: number;
    TagId: number;
    createdAt: string;
    updatedAt: string;
  };
}
