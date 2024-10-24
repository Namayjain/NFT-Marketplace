"use client";
import { WalletContext } from "@/context/wallet";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import MarketplaceJson from "../marketplace.json";
import styles from "./profile.module.css";
import Header from "../components/header/Header";
import axios from "axios";
import NFTTile from "../components/nftCard/NFTCard";
import { motion } from 'framer-motion';
import { Loader2, Wallet, Image as ImageIcon, AlertCircle } from 'lucide-react';

export default function Profile() {
  const [items, setItems] = useState();
  const [totalPrice, setTotalPrice] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const { isConnected, userAddress, signer } = useContext(WalletContext);

  async function getNFTitems() {
    let sumPrice = 0;
    const itemsArray = [];
    if (!signer) return;
    
    let contract = new ethers.Contract(
      MarketplaceJson.address,
      MarketplaceJson.abi,
      signer
    );
    
    let transaction = await contract.getMyNFTs();
    
    for (const i of transaction) {
      const tokenId = parseInt(i.tokenId);
      const tokenURI = await contract.tokenURI(tokenId);
      const meta = (await axios.get(tokenURI)).data;
      const price = ethers.formatEther(i.price);
      const item = {
        price,
        tokenId,
        seller: i.seller,
        owner: i.owner,
        image: meta.image,
        name: meta.name,
        description: meta.description,
      };
      itemsArray.push(item);
      sumPrice += Number(price);
    }
    return { itemsArray, sumPrice };
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { itemsArray, sumPrice } = await getNFTitems();
        setItems(itemsArray);
        setTotalPrice(sumPrice.toFixed(3));
      } catch (error) {
        console.error("Error fetching NFT items:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isConnected) {
      fetchData();
    }
  }, [isConnected]);

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (!isConnected) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.errorContainer}>
          <AlertCircle size={48} className={styles.errorIcon} />
          <h2 className={styles.errorTitle}>Wallet Not Connected</h2>
          <p className={styles.errorText}>
            Please connect your wallet to view your NFT collection
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.innerContainer}>
        <div className={styles.content}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarContainer}>
              <Wallet size={32} className={styles.walletIcon} />
            </div>
            <div className={styles.userInfo}>
              <h1 className={styles.title}>My Collection</h1>
              <div className={styles.addressContainer}>
                <span className={styles.address}>{userAddress}</span>
                <button 
                  className={styles.copyButton}
                  onClick={() => navigator.clipboard.writeText(userAddress)}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          <motion.div 
            className={styles.statsContainer}
            initial="hidden"
            animate="visible"
            variants={statsVariants}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.statCard}>
              <ImageIcon size={24} className={styles.statIcon} />
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>Total NFTs</span>
                <span className={styles.statValue}>{items?.length || 0}</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.ethIcon}>Ξ</div>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>Portfolio Value</span>
                <span className={styles.statValue}>{totalPrice} ETH</span>
              </div>
            </div>
          </motion.div>

          <div className={styles.nftSection}>
            <h2 className={styles.sectionTitle}>Your NFTs</h2>
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <Loader2 className={styles.loadingSpinner} />
                <p>Loading your collection...</p>
              </div>
            ) : items?.length > 0 ? (
              <motion.div 
                className={styles.nftGrid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {items.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NFTTile item={value} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className={styles.emptyState}>
                <ImageIcon size={48} className={styles.emptyIcon} />
                <h3>No NFTs Found</h3>
                <p>Start building your collection today!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}