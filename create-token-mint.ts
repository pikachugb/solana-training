import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, clusterApiUrl } from "@solana/web3.js"
import { createMint } from "@solana/spl-token";
import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log("USER: " + user.publicKey.toBase58());

const mintTxSig = await createMint(connection, user, user.publicKey, null, 9);

const link = getExplorerLink("address", mintTxSig.toString(), "devnet");

console.log("Token mint:" + link);