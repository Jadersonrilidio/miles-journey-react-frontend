import { selector } from "recoil";
import { destinationsFilter, destinationsState } from "../atom";
import IDestination from "../../interfaces/IDestination";
import http from "../../http";
import APIResponseSchema from "../../interfaces/APIResponseSchema";
import IReview from "../../interfaces/IReview";
import { REACT_APP_BASE_URL } from "../../../globals";

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

    return destinations;
  },
});

export const reviewsAsync = selector<IReview[]>({
  key: 'reviewsAsync',
  get: async () => {
    const reviews: IReview[] = [];

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

    return reviews;
  },
})
