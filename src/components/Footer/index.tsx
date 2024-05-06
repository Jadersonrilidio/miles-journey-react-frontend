import styles from './Footer.module.scss';
import logoPng from '../../assets/logos/logo-white-tagline.png';
import whatsappPng from '../../assets/icons/whatsapp.png';
import instagramPng from '../../assets/icons/instagram.png';
import twitterPng from '../../assets/icons/twitter.png';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.infoContainer}>
        <img src={logoPng} alt="app logo" onClick={() => navigate('/')} />
        <p>Horário de atendimento: 08h - 20h (Segunda a Sábado)</p>
        <p>Desenvolvido por Alura. Projeto fictício sem fins comerciais.</p>
      </div>
      <div className={styles.socialiteContainer}>
        <p>Acesse nossas redes:</p>
        <div className={styles.iconsContainer}>
          <img src={whatsappPng} alt="whatsapp icon" />
          <img src={instagramPng} alt="instagram icon" />
          <img src={twitterPng} alt="twitter icon" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;