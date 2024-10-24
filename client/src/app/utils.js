export default function GetIpfsUrlFromPinata(pinataUrl) {
  const ipfsHash = pinataUrl.split("/").pop();
  const IPFSUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
  return IPFSUrl;
}
