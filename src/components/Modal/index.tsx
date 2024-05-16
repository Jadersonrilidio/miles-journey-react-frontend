import styles from './Modals.module.scss';

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, open, onClose }: ModalProps) => {
  return (
    <>
      {open ? (<>
        <div className={styles.modalBackground}></div>
        <div className={styles.modalContainer}>
          <button className={styles.modalCloseBtn} onClick={onClose}>x</button>
          {children}
        </div>
      </>) : (<></>)
      }
    </>
  );
};

export default Modal;
