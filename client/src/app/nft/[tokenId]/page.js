"use client";
import { WalletContext } from "@/context/wallet";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import MarketplaceJson from "../../marketplace.json";
import { ethers } from "ethers";
import axios from "axios";
import GetIpfsUrlFromPinata from "@/app/utils";
import Image from "next/image";
import styles from "./nft.module.css";
import Header from "@/app/components/header/Header";
import Footer from "@/app/components/footer/Footer";

export default function NFTPage() {
  const { tokenId } = useParams();
  const [item, setItem] = useState(null);
  const [msg, setMsg] = useState("");
  const [btnContent, setBtnContent] = useState("Buy NFT");
  const { isConnected, userAddress, signer } = useContext(WalletContext);
  const router = useRouter();

  async function getNFTData() {
    if (!signer) return;
    const contract = new ethers.Contract(MarketplaceJson.address, MarketplaceJson.abi, signer);
    const tokenURI = GetIpfsUrlFromPinata(await contract.tokenURI(tokenId));
    const listedToken = await contract.getNFTListing(tokenId);

    const { data: meta } = await axios.get(tokenURI);

    let imageUrl = meta.image.startsWith("ipfs://") ? GetIpfsUrlFromPinata(meta.image) : meta.image;

    return {
      price: meta.price,
      tokenId,
      seller: listedToken.seller,
      owner: listedToken.owner,
      image: imageUrl,
      name: meta.name,
      description: meta.description,
    };
  }

  useEffect(() => {
    async function fetchData() {
      if (!signer) return;
      try {
        const fetchedItem = await getNFTData();
        setItem(fetchedItem);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
        setItem(null);
      }
    }
    fetchData();
  }, [signer, isConnected]);

  async function buyNFT() {
    if (!signer || !item) return;
    try {
      const contract = new ethers.Contract(MarketplaceJson.address, MarketplaceJson.abi, signer);
      const salePrice = ethers.parseUnits(item.price, "ether").toString();

      setBtnContent("Processing...");
      setMsg("Buying the NFT... Please Wait (Up to 5 mins)");

      const transaction = await contract.executeSale(tokenId, { value: salePrice });
      await transaction.wait();

      alert("You successfully bought the NFT!");
      setBtnContent("Buy NFT");
      setMsg("");
      router.push("/");
    } catch (error) {
      console.error("Error buying NFT:", error);
      setBtnContent("Buy NFT");
      setMsg("Failed to buy NFT. Please try again.");
    }
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.bgBlur} />
      <Header />
      <div className={`${styles.innerContainer} ${styles.fadeIn}`}>
        {isConnected ? (
          <div className={styles.content}>
            {item ? (
              <div className={styles.nftGrid}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt="NFT Image"
                    width={800}
                    height={520}
                    className={styles.nftImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.stats}>
                    <div className={styles.stat}>
                      <span className={styles.label}>Name:</span>
                      <span className={styles.value}>{item.name}</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.label}>Description:</span>
                      <span className={styles.value}>{item.description}</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.label}>Price:</span>
                      <span className={styles.value}>{item.price} ETH</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.label}>Seller:</span>
                      <span className={styles.value}>{item.seller}</span>
                    </div>
                  </div>
                  <div className={styles.ctaBtn}>
                    <div className={styles.msg}>{msg}</div>
                    {userAddress?.toLowerCase() === item.seller.toLowerCase() ? (
                      <div className={styles.msgAlert}>You already own this NFT</div>
                    ) : (
                      <button onClick={buyNFT} className={styles.Btn}>
                        {btnContent === "Processing..." && <span className={styles.spinner} />}
                        {btnContent}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.notConnected}>Loading NFT data...</div>
            )}
          </div>
        ) : (
          <div className={styles.notConnected}>Please connect your wallet to continue</div>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
}
