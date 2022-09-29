import { Account,Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction, LAMPORTS_PER_SOL, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import {  TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { refreshReserveInstruction } from "./instructionRefreshReserve";
import { refreshObligationInstruction } from "./instructionRefreshObligation";
import { privateKey } from "../../account";
export async function withdrawObligationCollateralInstruction(){
let programId=new PublicKey("3r1E3vDZEa6SozMCrw6B4GCSR4ZGJQQCf3YFj8ZLew9Z")
    const connection = new Connection('https://api.devnet.solana.com', {
        commitment: "finalized",
      });
  
     
    const account = new Account(privateKey);
    let reverseAddress=new PublicKey("5VVLD7BQp8y3bTgyF5ezm1ResyMTR3PhYsT4iHFU8Sxz");
      let solendId=new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");
      let priceAddress=new PublicKey("J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix");
      let switchboardFeedAddress=new PublicKey("AdtRGGhmqvom3Jemp5YNrxd9q9unX36BZk1pujkkXijL");
      let lendingProgramid=new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");
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
      console.log("TX withdraw Obligation Collateral Instruction With Devnet : ",tx)

}
export async function withdrawObligationCollateralInstructionWithMainnet(){
  let programId=new PublicKey("2kjwKLpiK8tXgwdtjQP4UTRFAHcpyH72VMbzbcRJfqvq")
      const connection = new Connection('https://api.mainnet-beta.solana.com', {
          commitment: "finalized",
        });
    
       
      const account = new Account(privateKey);
       let reverseAddress=new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36");
        let solendId=new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");
        let priceAddress=new PublicKey("H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG");
        let switchboardFeedAddress=new PublicKey("AdtRGGhmqvom3Jemp5YNrxd9q9unX36BZk1pujkkXijL");
        let lendingProgramid=new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");


        
        let sourceCollateral=new PublicKey("B1ATuYXNkacjjJS78MAmqu8Lu8PvEPt51u4oBasH1m1g");
        let destinationCollateral=new PublicKey("4U4A8jE3abhBmKxCVGJpChAN2eGHs3GKbrRMh8fiSznS");
        let withdrawReserve=new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36");
        let obligation=new PublicKey("GQocG58f4hfkgj8Q8hjWLznv4TyMQFqf8Z5XDBjAEQbY");
        let lendingMarket=new PublicKey("4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY");
        let lendingMarketAuthority=new PublicKey("DdZR6zRFiUt4S5mg7AV1uKB2z1f1WzcNYCaTEEWPAuby");
        let obligationOwner=new PublicKey("vqjaEKwZVk3eMa1c8i8PRmFpWrZLoK6xX1CdBxjFYuv");
  
        const refreshReserveIx = refreshReserveInstruction(
        reverseAddress,
        solendId,
        priceAddress,
        switchboardFeedAddress
      );
      const refreshObligationIx = refreshObligationInstruction(
        obligation,
        [new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36")],
      [],
        solendId
      );
      const transaction= new Transaction();
      transaction.add(refreshReserveIx,refreshObligationIx);
   
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
          { pubkey: account.publicKey, isSigner: true, isWritable: false },
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
  console.log("TX withdraw Obligation Collateral Instruction With Mainnet : ",tx)
  }
