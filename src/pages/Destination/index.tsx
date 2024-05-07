import styles from './Destination.module.scss';
import { useParams } from "react-router-dom";
import destinationBannerPng from '../../assets/images/banner_destiny.png';
import MiniBanner from "../../components/MiniBanner";
import Container from "../../components/Container";
import { useEffect } from 'react';
import useDestinations from '../../state/hooks/useDestinations';

const Destination: React.FC = () => {
  const { uuid } = useParams();
  const { destination, getDestinationByUuid } = useDestinations();

  useEffect(() => {
    getDestinationByUuid(uuid!);
  }, []);

  return (
    <>
      <MiniBanner background={destinationBannerPng} />
      <Container>
        <div className={styles.destinationDetailsContainer}>
          <h1>Discover {destination?.name}</h1>
          <h2>{destination?.meta}</h2>
          <div className={styles.imagesContainer}>
            <img src={destination?.photo_1} alt="place image" />
            {destination?.photo_2 && (
              <img src={destination?.photo_2} alt="place image" />
            )}
          </div>
          <p>{destination?.description}</p>
        </div>
      </Container>
    </>
  );
};

export default Destination;