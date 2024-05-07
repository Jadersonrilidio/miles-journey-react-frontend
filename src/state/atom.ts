import { atom } from "recoil";
import IDestination from "../interfaces/IDestination";
import IReview from "../interfaces/IReview";
import IDestinationFilter from "../interfaces/IDestinationFilter";
import { destinationsAsync, reviewsAsync } from "./selectors";
import { REACT_APP_STORAGE_ACCESS_TOKEN_KEY } from "../../globals.ts";

export const destinationsState = atom<IDestination[]>({
  key: 'destinationsState',
  default: destinationsAsync,
});

export const reviewsState = atom<IReview[]>({
  key: 'reviewsState',
  default: reviewsAsync,
});

export const destinationState = atom<IDestination | undefined>({
  key: 'singleDestinationState',
  default: undefined,
});

export const destinationsFilter = atom<IDestinationFilter>({
  key: 'destinationsFilter',
  default: { search: undefined },
});

export const authenticationState = atom<boolean>({
  key: 'authenticationState',
  default: sessionStorage.getItem(REACT_APP_STORAGE_ACCESS_TOKEN_KEY) != null,
});
