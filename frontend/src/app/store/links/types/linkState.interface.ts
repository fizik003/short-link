import { BackendErrorsInterface } from './../../types/backendError.interface';
import { TagResponseInterface } from './../../types/tagResponse.interface';
import { LinkResponseInterface } from './../../types/linkResponse.interface';
export interface LinkStateInterface {
  yourLinks: null | LinkResponseInterface[];
  othersUsersLink: null | LinkResponseInterface[];
  tags: null | TagResponseInterface[];
  isLoading: boolean;
  errors: null | BackendErrorsInterface;
}
