import { LinkResponseInterface } from './linkResponse.interface';
export interface CurrentUserInterface {
  id: number;
  email: string;
  token: string;
  links?: LinkResponseInterface[];
}
