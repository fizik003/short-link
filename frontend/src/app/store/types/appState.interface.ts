import { TagResponseInterface } from './tagResponse.interface';
import { LinkResponseInterface } from './linkResponse.interface';
import { StatisticsResponseInterface } from './statisticsRsponse.interface';
import { BackendErrorsInterface } from './backendError.interface';
import { CurrentUserInterface } from './currentUser.interface';
export interface AppStateInterface {
  isLoading: boolean;
  isLoggedIn: boolean;
  isSubmitting: boolean;
  currentUser: null | CurrentUserInterface;
  errors: BackendErrorsInterface | null;
  statistics: null | StatisticsResponseInterface;
  linksOtherUsers: null | LinkResponseInterface[];
  linksByTag: null | TagResponseInterface[];
}
