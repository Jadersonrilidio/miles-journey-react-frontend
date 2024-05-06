import { useNavigate } from 'react-router-dom';
import IDestination from '../../interfaces/IDestination';
import styles from './DestinationCard.module.scss';

interface DestinationCardProps {
  destination: IDestination
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }: DestinationCardProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.cardContainer}>
      <img src={destination.photo_1} alt="destination image" />
      <div>
        <h2>{destination.name}</h2>
        <h3>{destination.price}</h3>
        <button onClick={() => navigate(`/destination/${destination.uuid}`)}>SEE DETAILS</button>
      </div>
    </div>
  );
};

export default DestinationCard;