"use client"; // Add this line

import React from "react";
import { motion } from "framer-motion";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Link from "next/link";
import styles from "./page.module.css";
import About from "./components/aboutUs/page";
import InfiniteScrollImages from "./components/infiniteScroll/InfiniteScrollImages";

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <Header />

      {/* Animated Hero Section */}
      <div className={styles.hero}>
        {/* Image on the Left Side with Transition */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src="/left.png" alt="NFT Art Left" className={styles.cardImage} />
        </motion.div>

        <div className={styles.textContainer}>
          {/* Large Heading */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className={styles.heading}>
              Where Art Meets Innovation, <br />
              Step into NFTstore!
            </h1>
          </motion.div>

          {/* Description Text */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className={styles.description}
          >
           Discover a world of unique digital assets at our NFT Marketplace,
            where artists showcase their creativity and collectors find
             exclusive treasures. Buy, sell, and trade NFTs securely on
              the blockchain, transforming how we experience and own art.
               Join our vibrant community and explore the future of digital 
               collectibles today!
          </motion.p>

          {/* Buttons Section */}
          <div className={styles.btns}>
            <Link href="/marketplace" className={`${styles.btn} ${styles.buyBtn}`}>
              <motion.div
                initial = {{opacity : 0, x:50}}
                animate = {{opacity:1,x:0}}
                transition={{duration:1}}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Buy Now!
              </motion.div>
            </Link>
            <Link href="/sellNFT" className={styles.btn}>
              <motion.div
                 initial = {{opacity : 0, x:50}}
                 animate = {{opacity:1,x:0}}
                 transition={{duration:1}}
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
              >
                List Now!
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Image on the Right Side with Transition */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src="/right.png" alt="NFT Art Right" className={styles.cardImage} />
        </motion.div>
      </div>

      {/* Footer */}
      <InfiniteScrollImages/>
      <About/>
      <Footer />
    </div>
  );
}
