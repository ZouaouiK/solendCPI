import { Account,Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction, LAMPORTS_PER_SOL, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import {  TOKEN_PROGRAM_ID } from '@solana/spl-token';

export async function RefreshReserve(){
let programId=new PublicKey("EQT6PJWiZotrWUam7MxcKKbX1hKG7kUEabRQSoHbDGwH")
    const connection = new Connection('https://api.devnet.solana.com', {
        commitment: "finalized",
      });
  
      
  
      let reverseAddress=new PublicKey("5VVLD7BQp8y3bTgyF5ezm1ResyMTR3PhYsT4iHFU8Sxz");
      let solendId=new PublicKey("ALend7Ketfx5bxh6ghsCDXAoDrhvEmsXT3cynB6aPLgx");
      let priceAddress=new PublicKey("J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix");
      let switchboardFeedAddress=new PublicKey("AdtRGGhmqvom3Jemp5YNrxd9q9unX36BZk1pujkkXijL");
     
      let account = new Account([100,20,230,37,235,65,189,181,77,36,75,183,186,81,40,0,72,14,113,158,77,68,43,36,30,4,204,68,66,32,16,194,22,236,64,226,33,29,106,20,204,149,203,95,186,204,144,172,228,228,195,16,218,163,59,237,147,240,235,175,87,58,142,168])


    let owner=account.publicKey;
    let create_account=new Account();
    let [authority, nonce] = await PublicKey.findProgramAddress(
       [create_account.publicKey.toBuffer()],
       programId,
     ); 
   
      const transaction = new Transaction();
      
      const keys = [
        { pubkey: reverseAddress, isSigner: false, isWritable: true },
        { pubkey: priceAddress, isSigner: false, isWritable: false },
        { pubkey: switchboardFeedAddress, isSigner: false, isWritable: false },
        { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
        { pubkey: solendId, isSigner: false, isWritable: false },
        { pubkey: authority, isSigner: false, isWritable: false }, 
        { pubkey: create_account.publicKey, isSigner: false, isWritable: false }, 
         ];
 
         
      const instruction = new TransactionInstruction({
        keys,
         programId,
         data: Buffer.from([nonce]), // All instructions are hellos
       });
      transaction.add(instruction);
      let tx= await sendAndConfirmTransaction(
        connection,
        transaction,
        [account],
      ); 
console.log("TX refresh reserve :",tx)
}
