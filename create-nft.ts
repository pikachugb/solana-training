import { Connection, clusterApiUrl } from "@solana/web3.js";
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  NftWithToken,
  toMetaplexFile,
  PublicKey,
} from "@metaplex-foundation/js";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import * as fs from "fs";

interface NftData {
  name: string;
  symbol: string;
  description: string;
  sellerFeeBasisPoints: number;
  imageFile: string;
}

const nftData = {
  name: "New Solana Meme NFT",
  symbol: "NSM",
  description: "First Solana Meme in Romania :)",
  sellerFeeBasisPoints: 0,
  imageFile: "first_nft.png",
};
const updateNftData = {
  name: "Update",
  symbol: "UPDATE",
  description: "Update Description",
  sellerFeeBasisPoints: 100,
  imageFile: "success.png",
};

async function uploadMetadata(
  metaplex: Metaplex,
  nftData: NftData,
): Promise<string> {
  console.log("🚀 Uploading metadata...");

  const buffer = fs.readFileSync("./" + nftData.imageFile);

  const file = toMetaplexFile(buffer, nftData.imageFile);

  const imageUri = await metaplex.storage().upload(file);
  console.log("image uri:", imageUri);

  const { uri } = await metaplex.nfts().uploadMetadata({
    name: nftData.name,
    symbol: nftData.symbol,
    description: nftData.description,
    uri: imageUri
  })

  console.log("Done ✅! Metadata uri:", uri);

  return uri;
}

async function createNft(
  metaplex: Metaplex,
  uri: string,
  nftData: NftData,
): Promise<NftWithToken> {
  console.log("🚀 Creating NFT...");

  const { nft } = await metaplex.nfts().create({
    uri: uri,
    name: nftData.name,
    sellerFeeBasisPoints: nftData.sellerFeeBasisPoints,
    symbol: nftData.symbol
    }, {
        commitment: "confirmed"
  });

  const link = getExplorerLink("address", nft.address.toString(), "devnet");
  console.log(`✅ Token Mint: ${link}`);

  return nft;
}

async function main() {
  const connection = new Connection(clusterApiUrl("devnet"));

  const user = getKeypairFromEnvironment("SECRET_KEY");

  console.log(
    `🔑 We've loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`,
  );

  const metaplex = new Metaplex(connection)
  .use(keypairIdentity(user))
  .use(
    bundlrStorage({
        address: "https://devnet.bundlr.network",
        providerUrl: "https://api.devnet.solana.com"
    })
  )

  const uri = await uploadMetadata(metaplex, nftData);

  const nft = await createNft(metaplex, uri, nftData);

  const updatedUri = await uploadMetadata(metaplex, updateNftData);
}

main()
  .then(() => {
    console.log("Finished successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });