import styles from './DestinationsContainer.module.scss';

interface DestinationsContainerProps {
  children: React.ReactNode
}

const DestinationsContainer: React.FC<DestinationsContainerProps> = ({ children }: DestinationsContainerProps) => {
  return (
    <div className={styles.destinationsContainer}>
      <h2>Destinations</h2>
      <div className={styles.destinationsCardsContainer}>
        {children}
      </div>
    </div>
  );
};

export default DestinationsContainer;
