import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js"
import { createMint, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log("USER: " + user.publicKey.toBase58());

const MARIUS_ADDRESS = "DmqtCniQKuEJ7WEfEiXmJuPiUkL6AXo91FkVuyo2CLYR";
const TOKEN_MINT_ADDRESS = "FNruu4Q5peTN5Dutb3Vjb8zYz3PUf42Nzr5HFMfb9Kr1";
const marius = new PublicKey(MARIUS_ADDRESS);
const tokenMintAccount = new PublicKey(TOKEN_MINT_ADDRESS);

const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, user, tokenMintAccount, marius);

const link = getExplorerLink("address", tokenAccount.address.toBase58(), "devnet");

console.log("Token account:" + link);