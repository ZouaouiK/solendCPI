import { Account,Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction, LAMPORTS_PER_SOL, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import {  TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { privateKey } from "../../account";

export async function RefreshReserve(){
let programId=new PublicKey("EQT6PJWiZotrWUam7MxcKKbX1hKG7kUEabRQSoHbDGwH")
    const connection = new Connection('https://api.devnet.solana.com', {
        commitment: "finalized",
      });
  
      
  
      let reverseAddress=new PublicKey("5VVLD7BQp8y3bTgyF5ezm1ResyMTR3PhYsT4iHFU8Sxz");
      let solendId=new PublicKey("ALend7Ketfx5bxh6ghsCDXAoDrhvEmsXT3cynB6aPLgx");
      let priceAddress=new PublicKey("J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix");
      let switchboardFeedAddress=new PublicKey("AdtRGGhmqvom3Jemp5YNrxd9q9unX36BZk1pujkkXijL");
     
      let account = new Account(privateKey)


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
