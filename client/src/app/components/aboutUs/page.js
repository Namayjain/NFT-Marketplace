import Image from 'next/image';
import styles from './about.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src="/face.png" // Replace with your NFT image
          alt="NFT Artwork"
          className={styles.floatingImage}
          width={500}
          height={500}
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>About Our NFT Marketplace</h1>
        <p className={styles.description}>
          Welcome to the future of digital assets! Our NFT marketplace is where creativity meets blockchain technology, providing a platform for artists, collectors, and enthusiasts to buy, sell, and trade unique digital items.
        </p>
        <p className={styles.description}>
          We offer a seamless experience, combining cutting-edge tech with an intuitive user interface. Whether you're here to discover exclusive art or showcase your own, our marketplace is designed to be accessible and secure for all.
        </p>
      </div>
    </div>
  );
}