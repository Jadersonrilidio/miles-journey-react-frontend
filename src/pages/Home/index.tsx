import bannerTopBackground from '../../assets/images/banner_home_background.png';
import bannerFooterBackground from '../../assets/images/banner_home_footer.png';
import bannerImagePng from '../../assets/images/banner_home_image.png';
import Banner from '../../components/Banner';
import Container from '../../components/Container';
import DestinationForm from '../../components/DestinationForm';
import DestinationsContainer from '../../components/DestinationsContainer';
import DestinationCard from '../../components/DestinationCard';
import ReviewsContainer from '../../components/ReviewsContainer';
import ReviewCard from '../../components/ReviewCard';
import useDestinations from '../../state/hooks/useDestinations';
import useReviews from '../../state/hooks/useReviews';

const Home: React.FC = () => {
  const { destinations } = useDestinations();
  const { reviews } = useReviews();

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
        <DestinationForm />
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