import { Account,Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction, LAMPORTS_PER_SOL, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import {  TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { privateKey } from "../../account";

export async function RefreshReserve(){
let programId=new PublicKey("CBsWxVDgvTGsYeGkKJ6DAYNKbzTXBzK2G63GxFSYgwqY")

let conUrl='https://api.mainnet-beta.solana.com'
  const connection = new Connection(conUrl, {
    commitment: "finalized",
  });
      /* let reverseAddress=new PublicKey("5VVLD7BQp8y3bTgyF5ezm1ResyMTR3PhYsT4iHFU8Sxz");
      let solendId=new PublicKey("ALend7Ketfx5bxh6ghsCDXAoDrhvEmsXT3cynB6aPLgx");
      let priceAddress=new PublicKey("J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix");
      let switchboardFeedAddress=new PublicKey("AdtRGGhmqvom3Jemp5YNrxd9q9unX36BZk1pujkkXijL"); */

      let reverseAddress=new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36");
      let solendId=new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");
      let priceAddress=new PublicKey("H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG");
      let switchboardFeedAddress=new PublicKey("GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR");
   
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
