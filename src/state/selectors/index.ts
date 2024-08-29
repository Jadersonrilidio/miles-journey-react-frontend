import { selector } from "recoil";
import { destinationsFilter, destinationsState } from "../atom";
import IDestination from "../../interfaces/IDestination";
import http from "../../http";
import APIResponseSchema from "../../interfaces/APIResponseSchema";
import IReview from "../../interfaces/IReview";
import { REACT_APP_BASE_URL, REACT_APP_STORAGE_ACCESS_TOKEN_KEY } from "../../../globals";
import IUser from "../../interfaces/IUser";

export const filteredDestinationsState = selector<IDestination[]>({
  key: 'filteredDestinationsState',
  get: ({ get }) => {
    const filter = get(destinationsFilter);
    const destinations = get(destinationsState);

    const filteredDestinations = destinations.filter(destination => {
      if (filter.search && filter.search.length > 0) {
        return destination.name.toLowerCase().includes(filter.search!.toLowerCase());
      }
      return true;
    });

    return filteredDestinations;
  },
});

export const destinationsAsync = selector<IDestination[]>({
  key: 'destinationsAsync',
  get: async () => {
    const destinations: IDestination[] = [];

    try {
      const response = await http.get<APIResponseSchema<IDestination[]>>('/destinations');

      if (response.data.data) {
        const loadedDestinations = response.data.data.map(destination => {
          return {
            ...destination,
            photo_1: REACT_APP_BASE_URL + `/${destination.photo_1}`,
            photo_2: destination.photo_2 && REACT_APP_BASE_URL + `/${destination.photo_2}`,
          }
        });

        destinations.push(...loadedDestinations);
      }
    } catch (error: any) {
      // console.log(error);
    }

    return destinations;
  },
});

export const reviewsAsync = selector<IReview[]>({
  key: 'reviewsAsync',
  get: async () => {
    const reviews: IReview[] = [];

    try {
      const response = await http.get<APIResponseSchema<IReview[]>>('/reviews');

      if (response.data.data) {
        const loadedReviews = response.data.data.map(review => {
          return {
            ...review,
            picture: REACT_APP_BASE_URL + `/${review.picture}`,
          }
        });

        reviews.push(...loadedReviews);
      }
    } catch (error: any) {
      // console.log(error);
    }

    return reviews;
  },
});

export const userAsync = selector<IUser | undefined>({
  key: 'userAsync',
  get: async () => {
    if (!sessionStorage.getItem(REACT_APP_STORAGE_ACCESS_TOKEN_KEY)) {
      return undefined;
    }

    try {
      const response = await http.get<APIResponseSchema<IUser>>('/auth/me');

      return (response.data.data ? {
        ...response.data.data,
        picture: response.data.data.picture ? REACT_APP_BASE_URL + `/${response.data.data.picture}` : null,
      } as IUser : undefined);
    } catch (error: any) {
      // console.log(error);
    }

    return undefined;
  },
});
