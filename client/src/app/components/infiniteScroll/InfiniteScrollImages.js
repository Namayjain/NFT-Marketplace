import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './InfiniteScrollImages.module.css';

const InfiniteTechScroll = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  const technologies = [
    { id: 1, src: "/HTML5.png", alt: "HTML5" },
    { id: 2, src: "/CSS3.png", alt: "CSS3" },
    { id: 3, src: "/Hardhat.png", alt: "Hardhat" },
    { id: 4, src: "/Ipfs.png", alt: "IPFS" },
    { id: 5, src: "/Solidity.png", alt: "Solidity" },
    { id: 6, src: "/Next.js.png", alt: "Next.js" },
    { id: 7, src: "/React.png", alt: "React" },
    { id: 8, src: "/blockchain.png", alt: "blockchain" },
    { id: 9, src: "/Ethereum ETH.png", alt: "Etherium ETH" },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;
    const scrollSpeed = 1.5;

    const animate = () => {
      if (!isHovered) {
        setScrollPosition((prev) => {
          const newPosition = prev + scrollSpeed;
          const resetPoint = container.scrollWidth / 3; // Adjusted to loop after 1/3 of the width
          return newPosition >= resetPoint ? 0 : newPosition;
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <div className={styles.wrapper}>
      <div 
        ref={containerRef}
        className={styles.scrollContainer}
        style={{ transform: `translateX(-${scrollPosition}px)` }}  // Corrected to use template literal
      >
        {[...technologies, ...technologies, ...technologies].map((tech, index) => (
          <div
            key={index}
            className={styles.imageWrapper}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              src={tech.src}
              alt={tech.alt}
              width={192}
              height={192}
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteTechScroll;
