import { Account,Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction, LAMPORTS_PER_SOL, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import {  TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { refreshReserveInstruction } from "./instructionRefreshReserve";
import { refreshObligationInstruction } from "./instructionRefreshObligation";
import { privateKey } from "../../account";
export async function withdrawObligationCollateralInstructionDevnet(){
let programId=new PublicKey("AisCH9PMAswukUTS3siGQtkxna9SWCaNhCLzzzcSB3i")
    const connection = new Connection('https://api.devnet.solana.com', {
        commitment: "finalized",
      });
  
     
    const account = new Account(privateKey);
    let reverseAddress=new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36");
      let solendId=new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");
      let priceAddress=new PublicKey("H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG");
      let switchboardFeedAddress=new PublicKey("GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR");
      let lendingProgramid=new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");
      
      let sourceCollateral=new PublicKey("B1ATuYXNkacjjJS78MAmqu8Lu8PvEPt51u4oBasH1m1g");
      let destinationCollateral=new PublicKey("DwbMjpyio6kW575xBdPkCTFgpMEo2cfWLeGf1iQMfgcb");
      let withdrawReserve=new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36");
      let obligation=new PublicKey("ARY5UYV5ZKSiYKeUR4UWp94cdoTZPRUYVr2omQ8SNqVF");
      let lendingMarket=new PublicKey("4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY");
      let lendingMarketAuthority=new PublicKey("DdZR6zRFiUt4S5mg7AV1uKB2z1f1WzcNYCaTEEWPAuby");
      let obligationOwner=new PublicKey("2pxb5gAv7VxDCq5pDs5P8Euhki6XYDhA9FRiRMd4PxVu");

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
  let programId=new PublicKey("AisCH9PMAswukUTS3siGQtkxna9SWCaNhCLzzzcSB3i")
      const connection = new Connection('https://api.mainnet-beta.solana.com', {
          commitment: "finalized",
        });
    
      const account = new Account(privateKey);
       let reverseAddress=new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36");
        let solendId=new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");
        let priceAddress=new PublicKey("H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG");
        let switchboardFeedAddress=new PublicKey("GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR");
        let lendingProgramid=new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");


        
        let sourceCollateral=new PublicKey("B1ATuYXNkacjjJS78MAmqu8Lu8PvEPt51u4oBasH1m1g");
        let destinationCollateral=new PublicKey("DwbMjpyio6kW575xBdPkCTFgpMEo2cfWLeGf1iQMfgcb");
        let withdrawReserve=new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36");
        let obligation=new PublicKey("ARY5UYV5ZKSiYKeUR4UWp94cdoTZPRUYVr2omQ8SNqVF");
        let lendingMarket=new PublicKey("4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY");
        let lendingMarketAuthority=new PublicKey("DdZR6zRFiUt4S5mg7AV1uKB2z1f1WzcNYCaTEEWPAuby");
        //let obligationOwner=new PublicKey("2pxb5gAv7VxDCq5pDs5P8Euhki6XYDhA9FRiRMd4PxVu");
  
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
