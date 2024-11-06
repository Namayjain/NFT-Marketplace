"use client";
import { useState, useContext } from 'react';
import { WalletContext } from "@/context/wallet";
import { BrowserProvider } from "ethers";
import Link from "next/link";
import { Menu, X, LogOut } from 'lucide-react';
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    isConnected,
    setIsConnected,
    userAddress,
    setUserAddress,
    signer,
    setSigner,
  } = useContext(WalletContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      // Detect if the platform is mobile or desktop
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        // Redirect to MetaMask App or App Store if MetaMask is not installed
        window.location.href = "https://metamask.app.link/dapp/nft-marketplacemp.vercel.app/";
      } else {
        alert("MetaMask is not installed. Please install it to connect your wallet.");
      }
      return;
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
        alert("Please switch your MetaMask to the Sepolia network");
        return;
      }
    } catch (error) {
      console.error("Connection error: ", error);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setUserAddress("");
    setSigner(null);
    setIsMenuOpen(false); // Close mobile menu on disconnect
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.title}>
          Picasso Palette
        </Link>

        {/* Desktop Navigation */}
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

        {/* Desktop Wallet Actions */}
        <div className={styles.walletActions}>
          {isConnected && (
            <button
              onClick={disconnectWallet}
              className={styles.disconnectBtn}
            >
              <LogOut size={18} />
              <span>Disconnect</span>
            </button>
          )}
          <button
            className={`${styles.ctaBtn} ${isConnected ? styles.activebtn : styles.inactivebtn}`}
            onClick={connectWallet}
          >
            {isConnected ? (
              <>
                <img 
                  src="/MetaMask.png" 
                  alt="MetaMask" 
                  className={styles.metamaskIcon}
                />
                <span>Connected</span>
              </>
            ) : (
              <>
                <img 
                  src="/MetaMask.png" 
                  alt="MetaMask" 
                  className={styles.metamaskIcon}
                />
                <span>Connect Wallet</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuBtn}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <ul className={styles.mobileNavLinks}>
          <li style={{"--item-index": 1}}>
            <Link 
              href="/marketplace" 
              className={styles.link} 
              onClick={() => setIsMenuOpen(false)}
            >
              Buy NFT
            </Link>
          </li>
          <li style={{"--item-index": 2}}>
            <Link 
              href="/sellNFT" 
              className={styles.link} 
              onClick={() => setIsMenuOpen(false)}
            >
              List NFT
            </Link>
          </li>
          <li style={{"--item-index": 3}}>
            <Link 
              href="/profile" 
              className={styles.link} 
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          </li>
        </ul>
        <div className={styles.mobileWalletActions}>
          {isConnected && (
            <button
              onClick={disconnectWallet}
              className={styles.disconnectBtn}
            >
              <LogOut size={18} />
              <span>Disconnect</span>
            </button>
          )}
          <button
            className={`${styles.ctaBtn} ${isConnected ? styles.activebtn : styles.inactivebtn}`}
            onClick={connectWallet}
          >
            {isConnected ? (
              <>
                <img 
                  src="/MetaMask.png" 
                  alt="MetaMask" 
                  className={styles.metamaskIcon}
                />
                <span>Connected</span>
              </>
            ) : (
              <>
                <img 
                  src="/MetaMask.png" 
                  alt="MetaMask" 
                  className={styles.metamaskIcon}
                />
                <span>Connect Wallet</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}