import { useRecoilValue } from "recoil";
import { reviewsState } from "../atom";

const useReviews = () => {
  const reviews = useRecoilValue(reviewsState);

  return {
    reviews
  }
};

export default useReviews;
