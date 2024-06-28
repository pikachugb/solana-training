import "dotenv/config";
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
import bs58  from "bs58";
import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";
const connection = new Connection(clusterApiUrl("devnet"));

console.log("Connected to devnet");

const wolf = "7ex95SBsiEP11awST86WoEpfjy9CTANberhkJKM8nuMb";
const keypair = getKeypairFromEnvironment("SECRET_KEY");

const newKey = bs58.encode(keypair.secretKey);

console.log(newKey);

const publicKey = new PublicKey(wolf);

const balance = await connection.getBalance(publicKey);

console.log("Balance for " + wolf + " is " + balance);

// await airdropIfRequired(connection, publicKey, 2 * LAMPORTS_PER_SOL, 6 * LAMPORTS_PER_SOL);