import styles from './Container.module.scss';

interface ContainerProps {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <section className={styles.container}>
      {children}
    </section>
  );
};

export default Container;
