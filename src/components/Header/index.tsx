import styles from './Header.module.scss';
import logoPng from '../../assets/logos/logo-white-tagline.png';
import { Link, useNavigate } from 'react-router-dom';
import userIconPng from '../../assets/icons/user.png';
import useAuth from '../../state/hooks/useAuth';

const Header: React.FC = () => {
  const { auth, persistToken, clearToken } = useAuth();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <img src={logoPng} alt="Miles Journey logo" onClick={() => navigate('/')} />
      <div className={styles.navContainer}>
        {auth ?
          <>
            <Link to="#" className={styles.navlink}>Sell miles</Link>
            <Link to="#" className={styles.navlink}>About</Link>
            <div className={styles.menuContainer}>
              <img src={userIconPng} alt="Miles Journey logo" className={styles.user} />
              <button className={styles.btnSecondary} onClick={() => clearToken()}>LOGOUT</button>
            </div>
          </>
          :
          <>
            <div className={styles.menuContainer}>
              <button className={styles.btnPrimary}>REGISTER</button>
              <button className={styles.btnSecondary} onClick={() => persistToken('mock_access_token')}>LOGIN</button>
            </div>
          </>
        }
      </div>
    </header>
  );
};

export default Header;