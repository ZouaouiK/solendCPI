import { Account, Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction, LAMPORTS_PER_SOL, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { refreshReserveInstruction } from "./instructionRefreshReserve";
import { refreshObligationInstruction } from "./instructionRefreshObligation";
import { privateKey } from "../../account";

export async function withdrawObligationCollateralAndRedeemReserveCollateralWithMainnet() {
  let programId = new PublicKey("DpFAajFXarpyjDJkYuXtsa6VyXB4EjQoPYJhMPRKEwm2")
  const connection = new Connection('https://api.mainnet-beta.solana.com', {
    commitment: "finalized",
  });

  let account = new Account( privateKey)

  let tokenMint = new PublicKey("So11111111111111111111111111111111111111112");
  let userTokenAccountAddress = await Token.getAssociatedTokenAddress(
   ASSOCIATED_TOKEN_PROGRAM_ID,
   TOKEN_PROGRAM_ID,
   tokenMint,
   account.publicKey);  
   const userTokenAccountInfo = await connection.getAccountInfo(
     userTokenAccountAddress
   );
   if (!userTokenAccountInfo) {
     const createUserTokenAccountIx =
       Token.createAssociatedTokenAccountInstruction(
         ASSOCIATED_TOKEN_PROGRAM_ID,
         TOKEN_PROGRAM_ID,
         tokenMint,
         userTokenAccountAddress,
         account.publicKey,
         account.publicKey
       );
       let createATATxn = await sendAndConfirmTransaction(
         connection,
         new Transaction().add(createUserTokenAccountIx),
         [account],
       );
console.log("initialize ata : ", createATATxn)
  
   }

console.log("userTokenAccountAddress ",userTokenAccountAddress.toBase58())

  
  let reverseAddress = new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36");
  let solendId = new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");
  let priceAddress = new PublicKey("H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG");
  let switchboardFeedAddress = new PublicKey("GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR");
  let lendingProgramid = new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");



  let sourceCollateral = new PublicKey("B1ATuYXNkacjjJS78MAmqu8Lu8PvEPt51u4oBasH1m1g");
  let destinationCollateral = new PublicKey("DwbMjpyio6kW575xBdPkCTFgpMEo2cfWLeGf1iQMfgcb");
  let withdrawReserve = new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36");
  let obligation = new PublicKey("ARY5UYV5ZKSiYKeUR4UWp94cdoTZPRUYVr2omQ8SNqVF");
  let lendingMarket = new PublicKey("4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY");
  let lendingMarketAuthority = new PublicKey("DdZR6zRFiUt4S5mg7AV1uKB2z1f1WzcNYCaTEEWPAuby");
  let destinationLiquidity = new PublicKey("BR1qCPSBeyxRR9Dxi8hry8kbWz64vtx5FwDp5XP4hL3a");
  let reserveCollateralMint = new PublicKey("5h6ssFpeDeRbzsEHDbTQNH7nVGgsKrZydxdSTnLm6QdV");
  let reserveLiquiditySupply = new PublicKey("8UviNr47S8eL6J3WfDxMRa3hvLta1VDJwNWqsDgtN3Cv");
  let obligationOwner = new PublicKey("2pxb5gAv7VxDCq5pDs5P8Euhki6XYDhA9FRiRMd4PxVu");
  let transferAuthority = new PublicKey("2pxb5gAv7VxDCq5pDs5P8Euhki6XYDhA9FRiRMd4PxVu");
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
  const transaction = new Transaction();
  transaction.add(refreshReserveIx, refreshObligationIx);




  const keys = [
    { pubkey: sourceCollateral, isSigner: false, isWritable: true },
    { pubkey: destinationCollateral, isSigner: false, isWritable: true },
    { pubkey: withdrawReserve, isSigner: false, isWritable: true },
    { pubkey: obligation, isSigner: false, isWritable: true },
    { pubkey: lendingMarket, isSigner: false, isWritable: false },
    { pubkey: lendingMarketAuthority, isSigner: false, isWritable: false },
    { pubkey: userTokenAccountAddress, isSigner: false, isWritable: true },//destinationLiquidity
    { pubkey: reserveCollateralMint, isSigner: false, isWritable: true },
    { pubkey: reserveLiquiditySupply, isSigner: false, isWritable: true },
    { pubkey: obligationOwner, isSigner: true, isWritable: false },
    { pubkey: transferAuthority, isSigner: true, isWritable: false },
    { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: lendingProgramid, isSigner: false, isWritable: false },
  ];

  let collateralAmount = 10;
  const instruction = new TransactionInstruction({
    keys,
    programId,
    data: Buffer.from([collateralAmount]), // All instructions are hellos
  });
  transaction.add(instruction);
  let tx = await sendAndConfirmTransaction(
    connection,
    transaction,
    [account],
  );
  console.log("TX withdraw Obligation Collateral And Redeem Reserve Collateral With Mainnet : ", tx)
} 
