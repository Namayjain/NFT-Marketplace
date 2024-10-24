"use client";
import { WalletContext } from "@/context/wallet";
import { BrowserProvider } from "ethers";
import Link from "next/link";
import { useContext } from "react";
import { Inter } from '@next/font/google'; 
import styles from "./Header.module.css";

// Import the Inter font
const inter = Inter({ subsets: ['latin'] });

export default function Header() {
  const {
    isConnected,
    setIsConnected,
    userAddress,
    setUserAddress,
    signer,
    setSigner,
  } = useContext(WalletContext);

  const connectWallet = async () => {
    if (!window.ethereum) {
      throw new Error("Metamask is not installed");
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setSigner(signer);
      const accounts = await provider.send("eth_requestAccounts", []);
      setIsConnected(true);
      setUserAddress(accounts[0]);
      const network = await provider.getNetwork();
      const chainID = network.chainId;
      const sepoliaNetworkId = "11155111";

      if (chainID.toString() !== sepoliaNetworkId) {
        alert("Please switch your MetaMask to sepolia network");
        return;
      }
    } catch (error) {
      console.error("connection error: ", error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${inter.className}`}>
        {/* Align NFT Marketplace to the left */}
        <Link href="/" className={styles.title}>
          NFT Marketplace
        </Link>
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
        <button
          className={`${styles.ctaBtn} ${isConnected ? styles.activebtn : styles.inactivebtn}`}
          onClick={connectWallet}
        >
          {isConnected ? (
            <><h3>Connected</h3></>
          ) : (
            "Connect Metamask"
          )}
        </button>
      </div>
    </header>
  );
}
