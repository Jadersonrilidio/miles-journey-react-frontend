import styles from './LoginModal.module.scss';
import Modal from '..';
import useAuth from '../../../state/hooks/useAuth';
import { useState } from 'react';

interface LoginModalProps {
  open: boolean
  onClose: () => void
  onOpenRegister: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onOpenRegister }: LoginModalProps) => {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessageError(null);
    setEmailError(null);
    setPasswordError(null);

    if (email.trim() === '') {
      setEmailError('email cannot be empty');
      return;
    }

    if (password.trim() === '') {
      setPasswordError('password cannot be empty');
      return;
    }

    const result = await login(email, password);

    if (result) {
      handleClose();
    } else {
      setMessageError('invalid email or password');
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setMessageError(null);
    setEmailError(null);
    setPasswordError(null);
    onClose();
  };

  const handleOpenRegisterModal = () => {
    handleClose();
    onOpenRegister();
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h1 className={styles.formTitle}>Login</h1>

        {messageError && (<p className={styles.errorMsg}>* {messageError}</p>)}

        <div className={styles.formInput}>
          <label htmlFor="">Email</label>
          <input type="email" placeholder='usermail@example.com' value={email} onChange={event => setEmail(event.target.value)} />
          {emailError && (<p className={styles.errorMsg}>* {emailError}</p>)}
        </div>

        <div className={styles.formInput}>
          <label htmlFor="">Password</label>
          <input type="password" placeholder='password' value={password} onChange={event => setPassword(event.target.value)} />
          {passwordError && (<p className={styles.errorMsg}>* {passwordError}</p>)}
        </div>

        <div className={styles.formGroup}>
          <a href="#" onClick={handleOpenRegisterModal}>I want to register!</a>
          <a href="#">Forgot your password?</a>
          <button className={styles.formBtn}>LOGIN</button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
