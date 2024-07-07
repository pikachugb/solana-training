import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js"
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import "dotenv/config";

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 9);

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log("USER: " + user.publicKey.toBase58());

const TOKEN_MINT_ADDRESS = "FNruu4Q5peTN5Dutb3Vjb8zYz3PUf42Nzr5HFMfb9Kr1";
const tokenMintAccount = new PublicKey(TOKEN_MINT_ADDRESS);

const MARIUS_ADDRESS = "DmqtCniQKuEJ7WEfEiXmJuPiUkL6AXo91FkVuyo2CLYR";
const marius = new PublicKey(MARIUS_ADDRESS);

const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, user, tokenMintAccount, user.publicKey);

console.log("Token account: " + tokenAccount.address);

const mintTxSix = await mintTo(connection, user, tokenMintAccount, tokenAccount.address, user, 250 * MINOR_UNITS_PER_MAJOR_UNITS);

const link = getExplorerLink("transaction", mintTxSix, "devnet");

console.log("Mint token tx: " + link);