import styles from './MiniBanner.module.scss';

interface MiniBannerProps {
  background: string
}

const MiniBanner: React.FC<MiniBannerProps> = ({ background }: MiniBannerProps) => {
  return (
    <section className={styles.miniBanner} style={{ backgroundImage: `url(${background})` }}>
    </section>
  );
};

export default MiniBanner;
