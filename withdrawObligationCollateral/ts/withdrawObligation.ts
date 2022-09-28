import { Account,Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction, LAMPORTS_PER_SOL, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import {  TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { refreshReserveInstruction } from "./instructionRefreshReserve";
import { refreshObligationInstruction } from "./instructionRefreshObligation";
export async function withdrawObligationCollateralInstruction(){
let programId=new PublicKey("3r1E3vDZEa6SozMCrw6B4GCSR4ZGJQQCf3YFj8ZLew9Z")
    const connection = new Connection('https://api.devnet.solana.com', {
        commitment: "finalized",
      });
  
     
    const account = new Account([101,89,18,14,253,22,176,18,111,231,68,87,111,49,213,248,51,18,160,230,231,185,234,52,240,245,125,25,248,16,200,170,92,110,9,156,177,104,35,2,99,25,126,217,106,2,136,123,99,142,44,52,174,194,229,30,102,238,88,209,152,231,28,62]);
    let reverseAddress=new PublicKey("5VVLD7BQp8y3bTgyF5ezm1ResyMTR3PhYsT4iHFU8Sxz");
      let solendId=new PublicKey("ALend7Ketfx5bxh6ghsCDXAoDrhvEmsXT3cynB6aPLgx");
      let priceAddress=new PublicKey("J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix");
      let switchboardFeedAddress=new PublicKey("AdtRGGhmqvom3Jemp5YNrxd9q9unX36BZk1pujkkXijL");
      let lendingProgramid=new PublicKey("ALend7Ketfx5bxh6ghsCDXAoDrhvEmsXT3cynB6aPLgx");
      let sourceCollateral=new PublicKey("J5KGpESS8Zq2MvK4rtL6wKbeMRYZzb6TEzn8qPsZFgGd");
      let destinationCollateral=new PublicKey("7Nf2nn6vHcoXJPvRCAYJZ8xkGe1bu7S6iMUich9YkdEc");
      let withdrawReserve=new PublicKey("5VVLD7BQp8y3bTgyF5ezm1ResyMTR3PhYsT4iHFU8Sxz");
      let obligation=new PublicKey("3jKHf5otiGXgE5p7Pc3CL97eaJQPXpfnb5HVd21c9Zrw");
      let lendingMarket=new PublicKey("GvjoVKNjBvQcFaSKUW1gTE7DxhSpjHbE69umVR5nPuQp");
      let lendingMarketAuthority=new PublicKey("EhJ4fwaXUp7aiwvZThSUaGWCaBQAJe3AEaJJJVCn3UCK");
      let obligationOwner=new PublicKey("7DopuXS9vsbJ9fZqVyEypkNpNY24azW7EgwTXFcSAtpM");

      const refreshReserveIx = refreshReserveInstruction(
      reverseAddress,
      solendId,
      priceAddress,
      switchboardFeedAddress
    );
    const refreshObligationIx = refreshObligationInstruction(
      obligation,
      [new PublicKey("5VVLD7BQp8y3bTgyF5ezm1ResyMTR3PhYsT4iHFU8Sxz")],
    [],
      solendId
    );
    const transaction= new Transaction();
    transaction.add(refreshReserveIx,refreshObligationIx);
  /*   let tx1= await sendAndConfirmTransaction(
      connection,
      transaction1,
      [account],
    ); 
    */
    //const transaction = new Transaction();
     let owner=account.publicKey;
    let create_account=new Account();
    let [authority, nonce] = await PublicKey.findProgramAddress(
       [create_account.publicKey.toBuffer()],
       programId,
     ); 
  
    
      
      const keys = [
        { pubkey: sourceCollateral, isSigner: false, isWritable: true },
        { pubkey: destinationCollateral, isSigner: false, isWritable: true },
        { pubkey: withdrawReserve, isSigner: false, isWritable: false },
        { pubkey: obligation, isSigner: false, isWritable: true },
        { pubkey: lendingMarket, isSigner: false, isWritable: false },
        { pubkey: lendingMarketAuthority, isSigner: false, isWritable: false },
        { pubkey: obligationOwner, isSigner: true, isWritable: false },
        { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: lendingProgramid, isSigner: false, isWritable: false },
      ];
   
  
          const instruction = new TransactionInstruction({
        keys,
         programId,
         data: Buffer.alloc(0), // All instructions are hellos
       });
      transaction.add(instruction);
      let tx= await sendAndConfirmTransaction(
        connection,
        transaction,
        [account],
      ); 
console.log("TX init Lending market :",tx)
}
