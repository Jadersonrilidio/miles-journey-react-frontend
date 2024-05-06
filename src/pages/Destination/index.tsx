import styles from './Destination.module.scss';
import { useParams } from "react-router-dom";
import destinationBannerPng from '../../assets/images/banner_destiny.png';
import MiniBanner from "../../components/MiniBanner";
import Container from "../../components/Container";
import { useEffect, useState } from 'react';
import IDestination from '../../interfaces/IDestination';
import http from '../../http';
import APIResponseSchema from '../../interfaces/APIResponseSchema';

const Destination: React.FC = () => {
  const [destination, setDestination] = useState<IDestination | null>(null);
  const { uuid } = useParams();

  useEffect(() => {
    http.get<APIResponseSchema<IDestination>>(`destinations/${uuid}`)
      .then(response => {
        if (response.data.data) {
          const rawData = response.data.data;

          setDestination({
            ...rawData,
            photo_1: `http://localhost:8000/${rawData.photo_1}`,
            photo_2: rawData.photo_2 && `http://localhost:8000/${rawData.photo_2}`,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
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