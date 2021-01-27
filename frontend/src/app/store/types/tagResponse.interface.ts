import { LinkResponseInterface } from './linkResponse.interface';
export interface TagResponseInterface {
  id: number;
  name: string;
  createdAt: string;
  updateAt: string;
  LinkTag?: {
    createdAt: string;
    updatedAt: string;
    TagId: number;
    LinkId: number;
  };

  Links?: LinkResponseInterface[];
}
