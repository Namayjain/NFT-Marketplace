"use client"
import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.titleContainer}>
        <Link href="/" className={styles.title}>
          NFT Marketplace
        </Link>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/marketplace" className={styles.link}>
              Buy NFT
            </Link>
          </li>
          <li>
            <Link href="/sellNFT" className={styles.link}>
              List NFT
            </Link>
          </li>
          <li>
            <Link href="/profile" className={styles.link}>
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.socialMedia}>
        <Link href="https://www.instagram.com" target="_blank" className={styles.socialLink}>
          <img src="/instagram.png" alt="Instagram" />
        </Link>
        <Link href="https://www.linkedin.com" target="_blank" className={styles.socialLink}>
          <img src="/linkedin.png" alt="LinkedIn" />
        </Link>
        <Link href="https://twitter.com" target="_blank" className={styles.socialLink}>
          <img src="/x.png" alt="X" />
        </Link>
        <Link href="https://stackoverflow.com" target="_blank" className={styles.socialLink}>
          <img src="/stack-overflow.png" alt="StackOverflow" />
        </Link>
      </div>

      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} NFT Marketplace. All rights reserved.
      </div>
    </footer>
  );
}
