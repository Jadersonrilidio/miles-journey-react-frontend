import styles from './RegisterModal.module.scss';
import Modal from '..';
import useAuth from '../../../state/hooks/useAuth';
import { useState } from 'react';

interface RegisterModalProps {
  open: boolean
  onClose: () => void
  onOpenLogin: () => void
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose, onOpenLogin }: RegisterModalProps) => {
  const { register } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [picture, setPicture] = useState<File | null>(null);

  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [pictureError, setPictureError] = useState<string | null>(null);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetErrorMessages();

    if (username.trim() === '') {
      setUsernameError('name cannot be empty');
      return;
    }

    if (email.trim() === '') {
      setEmailError('email cannot be empty');
      return;
    }

    if (password.trim() === '') {
      setPasswordError('password cannot be empty');
      return;
    }

    if (password.trim().length < 8) {
      setPasswordError('password must have at least 8 characters');
      return;
    }

    if (passwordConfirm.trim() === '') {
      setPasswordConfirmError('you must confirm your password');
      return;
    }

    if (password.trim() !== passwordConfirm.trim()) {
      setPasswordError('passwords does not match');
      return;
    }

    let pictureKey: string | null = null;

    if (picture) {
      // const s3Response = await Vapor.store(picture);
      // pictureKey = s3Response.key;
    }

    const result = await register(username, email, password, pictureKey);

    if (result) {
      handleClose();
    } else {
      setMessageError('an error occurried. Please check your email and data again');
    }
  };

  const handleClose = () => {
    resetInputValues();
    resetErrorMessages();
    onClose();
  };

  const resetInputValues = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setPicture(null);
  };

  const resetErrorMessages = () => {
    setMessageError(null);
    setUsernameError(null);
    setEmailError(null);
    setPasswordError(null);
    setPasswordConfirmError(null);
    setPictureError(null);
  };

  const handleOpenLoginModal = () => {
    handleClose();
    onOpenLogin();
  };

  const onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPictureError(null);
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

      if (allowedTypes.includes(file.type)) {
        setPicture(file);
      } else {
        setPictureError('invalid file format');
      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form className={styles.form} onSubmit={handleRegister}>
        <h1 className={styles.formTitle}>Register</h1>

        {messageError && (<p className={styles.errorMsg}>* {messageError}</p>)}

        <div className={styles.formInput}>
          <label htmlFor="">Name</label>
          <input type="text" placeholder='Enter username' value={username} onChange={event => setUsername(event.target.value)} />
          {usernameError && (<p className={styles.errorMsg}>* {usernameError}</p>)}
        </div>

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

        <div className={styles.formInput}>
          <label htmlFor="">Profile picture</label>
          <input type="file" placeholder='formats: png, jpg, jpeg' accept='image/jpeg, image/jpg, image/png' onChange={onUploadFile} />
          {pictureError && (<p className={styles.errorMsg}>* {pictureError}</p>)}
        </div>

        <div className={styles.formInput}>
          <label htmlFor="">Confirm password</label>
          <input type="password" placeholder='repeat password' value={passwordConfirm} onChange={event => setPasswordConfirm(event.target.value)} />
          {passwordConfirmError && (<p className={styles.errorMsg}>* {passwordConfirmError}</p>)}
        </div>

        <div className={styles.formGroup}>
          <a href="#" onClick={handleOpenLoginModal}>I'm already a user!</a>
          <button className={styles.formBtn}>CREATE ACCOUNT</button>
        </div>
      </form>
    </Modal>
  );
};

export default RegisterModal;
