import styles from './Header.module.scss';
import logoPng from '../../assets/logos/logo-white-tagline.png';
import { Link, useNavigate } from 'react-router-dom';
import userIconPng from '../../assets/icons/user.png';
import useAuth from '../../state/hooks/useAuth';
import { useState } from 'react';
import LoginModal from '../Modal/LoginModal';
import RegisterModal from '../Modal/RegisterModal';

const Header: React.FC = () => {
  const { auth, user, logout } = useAuth();
  const navigate = useNavigate();

  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [registerModal, setRegisterModal] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <img src={logoPng} alt="Miles Journey logo" onClick={() => navigate('/')} />
      <div className={styles.navContainer}>
        {auth ?
          <>
            {user && (<p className={styles.navText}>Welcome back, {user.name}!</p>)}
            <Link to="#" className={styles.navlink}>Sell miles</Link>
            <Link to="#" className={styles.navlink}>About</Link>
            <div className={styles.menuContainer}>
              <img src={user?.picture ?? userIconPng} alt="user picture" className={styles.user} />
              <button className={styles.btnSecondary} onClick={logout}>LOGOUT</button>
            </div>
          </>
          :
          <>
            <div className={styles.menuContainer}>
              <button className={styles.btnPrimary} onClick={() => setRegisterModal(!registerModal)}>REGISTER</button>
              <button className={styles.btnSecondary} onClick={() => setLoginModal(!loginModal)}>LOGIN</button>
            </div>
            <LoginModal
              open={loginModal}
              onClose={() => setLoginModal(false)}
              onOpenRegister={() => setRegisterModal(true)}
            />
            <RegisterModal
              open={registerModal}
              onClose={() => setRegisterModal(false)}
              onOpenLogin={() => setLoginModal(true)}
            />
          </>
        }
      </div>
    </header>
  );
};

export default Header;