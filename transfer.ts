import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import { createMemoInstruction } from "@solana/spl-memo";

async function checkBalances(connection, receiverAndrei, receiverMarius) {
    
    const balanceRA = await connection.getBalance(receiverAndrei);
    const balanceRM = await connection.getBalance(receiverMarius);
    const balanceS = await connection.getBalance(sender.publicKey);
    
    console.log("Balance Andrei: " + ( balanceRA / LAMPORTS_PER_SOL ));
    console.log("Balance Marius: " + ( balanceRM / LAMPORTS_PER_SOL ));
    console.log("Balance Sender: " + ( balanceS / LAMPORTS_PER_SOL ));
}

const receiverAndrei = new PublicKey("E8fcsDTokKM6XvutFx48JnFh2a28DZJSJy8fgx8J8YpS");
const receiverMarius = new PublicKey("DmqtCniQKuEJ7WEfEiXmJuPiUkL6AXo91FkVuyo2CLYR");
    
const sender = getKeypairFromEnvironment("SECRET_KEY");
console.log(sender.publicKey.toBase58());

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

await checkBalances(connection, receiverAndrei, receiverMarius);

const transaction = new Transaction();
const transferInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: receiverMarius,
    lamports: 0.1 * LAMPORTS_PER_SOL
})

transaction.add(transferInstruction);

const memo = "Hai RO!";
const memoInstruction = createMemoInstruction(memo);

transaction.add(memoInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

console.log("Transaction confirmed. Sign: " + signature);

await checkBalances(connection, receiverAndrei, receiverMarius);




