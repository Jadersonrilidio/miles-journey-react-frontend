import styles from './DestinationForm.module.scss';
import searchIconPng from '../../assets/icons/search.png';
import useDestinationFilter from '../../state/hooks/useDestinationFilter';
import { useState } from 'react';

const DestinationForm: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const { applyFilter } = useDestinationFilter();

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (search.length > 0) {
      applyFilter(search);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={onSubmitForm}>
      <h2>Select your next destination:</h2>
      <div className={styles.formGroup}>
        <div className={styles.inputGroup}>
          <input type="text" placeholder="Origin" value={search} onChange={event => setSearch(event.target.value)} />
          <img src={searchIconPng} alt="search icon" />
        </div>
        <button type="submit">SEARCH</button>
      </div>
    </form>
  );
};

export default DestinationForm;
