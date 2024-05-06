import IReview from '../../interfaces/IReview';
import styles from './ReviewCard.module.scss';

interface ReviewCardProps {
  review: IReview
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }: ReviewCardProps) => {
  return (
    <div className={styles.card}>
      <img src={review.picture} alt="profile picture" />
      <div>
        <p>{review.review}</p>
        <h4>{review.name}</h4>
      </div>
    </div>
  );
};

export default ReviewCard;
