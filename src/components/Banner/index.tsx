import styles from './Banner.module.scss';

interface BannerProps {
  background: string
  text?: string
  textStrong?: string
  image?: string
  imageAlt?: string
}

const Banner: React.FC<BannerProps> = ({ background, text, textStrong, image, imageAlt }: BannerProps) => {
  return (
    <section className={styles.banner} style={{ backgroundImage: `url(${background})` }}>
      {text &&
        <p>{text}
          {textStrong && <strong>{textStrong}</strong>}
        </p>
      }
      {image && <img src={image} alt={imageAlt ?? 'image'} />}

    </section>
  );
};

export default Banner;
