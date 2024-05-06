import bannerTopBackground from '../../assets/images/banner_home_background.png';
import bannerFooterBackground from '../../assets/images/banner_home_footer.png';
import bannerImagePng from '../../assets/images/banner_home_image.png';
import Banner from '../../components/Banner';
import Container from '../../components/Container';
import DestinationForm from '../../components/DestinationForm';
import DestinationsContainer from '../../components/DestinationsContainer';
import DestinationCard from '../../components/DestinationCard';
import IDestination from '../../interfaces/IDestination';
import ReviewsContainer from '../../components/ReviewsContainer';
import IReview from '../../interfaces/IReview';
import ReviewCard from '../../components/ReviewCard';
import http from '../../http';
import { useEffect, useState } from 'react';
import APIResponseSchema from '../../interfaces/APIResponseSchema';

const Home: React.FC = () => {
  const [destinations, setDestinations] = useState<IDestination[]>([]);
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    http.get<APIResponseSchema<IDestination[]>>('/destinations')
      .then(response => {
        if (response.data.data) {
          setDestinations(response.data.data.map(destination => {
            return {
              ...destination,
              photo_1: `http://localhost:8000/${destination.photo_1}`,
              photo_2: destination.photo_2 && `http://localhost:8000/${destination.photo_2}`,
            }
          }));
        }
      })
      .catch(error => console.log(error));

    http.get<APIResponseSchema<IReview[]>>('/reviews')
      .then(response => {
        if (response.data.data) {
          setReviews(response.data.data.map(review => {
            return {
              ...review,
              picture: `http://localhost:8000/${review.picture}`
            }
          }));
        }
      })
      .catch(error => console.log(error));
  }, []);

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.target);

    const search = 'Kazan';

    http.get<APIResponseSchema<IDestination[]>>('/destinations', { params: { name: search } })
      .then(response => {
        if (response.data.data) {
          setDestinations(response.data.data.map(destination => {
            return {
              ...destination,
              photo_1: `http://localhost:8000/${destination.photo_1}`,
              photo_2: destination.photo_2 && `http://localhost:8000/${destination.photo_2}`,
            }
          }));
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <>
      <Banner
        background={bannerTopBackground}
        text='Share your miles, '
        textStrong='share the world.'
        image={bannerImagePng}
        imageAlt='traveler image with logo'
      />

      <Container>
        <DestinationForm onSubmit={onSubmitForm} />
      </Container>

      <Container>
        <DestinationsContainer>
          {destinations && destinations.map((destination, index) =>
            <DestinationCard destination={destination} key={index} />
          )}
        </DestinationsContainer>
      </Container>

      <Container>
        <ReviewsContainer>
          {reviews.map((review, index) =>
            <ReviewCard review={review} key={index} />
          )}
        </ReviewsContainer>
      </Container>

      <Banner background={bannerFooterBackground} />
    </>
  );
};

export default Home;