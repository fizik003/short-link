import { LinkStateInterface } from './../links/types/linkState.interface';
import { CurrentUserInterface } from './currentUser.interface';
import { AppStateInterface } from './appState.interface';
export interface AppAllStateInterface {
  app: AppStateInterface;
  user?: CurrentUserInterface;
  link?: LinkStateInterface;
}
