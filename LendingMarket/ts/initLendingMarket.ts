import { Account,Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {  TOKEN_PROGRAM_ID } from '@solana/spl-token';
export async function initLendingMarket(){
let programId=new PublicKey("E1PRiQyUbNbWVJrKtwt8Qb61S2K6yrNWeXPbS56w3p86")
    const connection = new Connection('https://api.devnet.solana.com', {
        commitment: "finalized",
      });
  
     
    const account = new Account([228,174,249,150,242,227,12,108,158,0,58,126,225,230,100,230,172,45,190,52,14,191,245,98,105,190,195,139,208,208,174,239,0,114,142,98,213,128,244,98,58,52,121,75,196,202,170,13,11,16,181,63,104,178,199,69,21,96,220,39,167,87,91,186]);

    const signature = await connection.requestAirdrop(account.publicKey, LAMPORTS_PER_SOL);
    await connection.confirmTransaction(signature);
    let owner=account.publicKey;
    let create_account=new Account();
    let [authority, nonce] = await PublicKey.findProgramAddress(
       [create_account.publicKey.toBuffer()],
       programId,
     ); 
    let publUSD=new PublicKey("zVzi5VAf4qMEwzv7NXECVx5v2pQ7xnqVVjCXZwS9XzA");
   
    let quoteCurrencyUSD=publUSD;
    let lendinMarket=new Account();
    let lendingProgramid=new PublicKey("ALend7Ketfx5bxh6ghsCDXAoDrhvEmsXT3cynB6aPLgx");
    let oraclePorgramId=new PublicKey("gSbePebfvPy7tRqimPoVecS2UsBvYv46ynrzWocc92s");
    let switchboardProgramId=new PublicKey("7azgmy1pFXHikv36q1zZASvFq5vFa39TT9NweVugKKTU")
    const LENDING_MARKET_SIZE  =290
    const lendingAccountInfoRentExempt =
      await connection.getMinimumBalanceForRentExemption(
        LENDING_MARKET_SIZE
      );
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.createAccount({
            fromPubkey: owner,
            newAccountPubkey:lendinMarket.publicKey,
            lamports: lendingAccountInfoRentExempt,
            space: LENDING_MARKET_SIZE,
            programId: lendingProgramid,
        })
      );

      const keys = [
        { pubkey: lendinMarket.publicKey, isSigner: false, isWritable: true },
        { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: oraclePorgramId, isSigner: false, isWritable: false },
        { pubkey: switchboardProgramId, isSigner: false, isWritable: false },
        { pubkey: owner, isSigner: false, isWritable: false },
        { pubkey: lendingProgramid, isSigner: false, isWritable: false }, 
         ];
    console.log("quoteCurrencyUSD ",quoteCurrencyUSD)
  
          const instruction = new TransactionInstruction({
        keys,
         programId,
         data: Buffer.from(quoteCurrencyUSD.toBuffer()), // All instructions are hellos
       });
      transaction.add(instruction);
      let tx= await sendAndConfirmTransaction(
        connection,
        transaction,
        [account,lendinMarket],
      ); 
console.log("TX init Lending market :",tx)
}
