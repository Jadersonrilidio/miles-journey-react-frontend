import styles from './DestinationForm.module.scss';
import searchIconPng from '../../assets/icons/search.png';

interface DestinationFormProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
}

const DestinationForm: React.FC<DestinationFormProps> = ({ onSubmit }: DestinationFormProps) => {
  return (
    <form className={styles.formContainer} onSubmit={onSubmit}>
      <h2>Select your next destination:</h2>
      <div className={styles.formGroup}>
        <div className={styles.inputGroup}>
          <input type="text" placeholder="Origin" />
          <img src={searchIconPng} alt="search icon" />
        </div>
        <button type="submit">SEARCH</button>
      </div>
    </form>
  );
};

export default DestinationForm;
