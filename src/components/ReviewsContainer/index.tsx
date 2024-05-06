import styles from './ReviewsContainer.module.scss';

interface ReviewsContainerProps {
  children: React.ReactNode
}

const ReviewsContainer: React.FC<ReviewsContainerProps> = ({ children }: ReviewsContainerProps) => {
  return (
    <div className={styles.reviewsContainer}>
      <h2>Reviews</h2>
      <div className={styles.reviewsCardsContainer}>
        {children}
      </div>
    </div>
  );
};

export default ReviewsContainer;