import { Account, Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction, LAMPORTS_PER_SOL, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { refreshReserveInstruction } from "./instructionRefreshReserve";
import { refreshObligationInstruction } from "./instructionRefreshObligation";
import { privateKey } from "../../account";

export async function withdrawObligationCollateralAndRedeemReserveCollateralWithMainnet() {
  let programId = new PublicKey("7zC1LAUnGcFRBLFyqZ4F3jCNczvbp1utUgaVdBPUCmwX")
  const connection = new Connection('https://api.mainnet-beta.solana.com', {
    commitment: "finalized",
  });


  const account = new Account(privateKey);
  let reverseAddress = new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36");
  let solendId = new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");
  let priceAddress = new PublicKey("H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG");
  let switchboardFeedAddress = new PublicKey("AdtRGGhmqvom3Jemp5YNrxd9q9unX36BZk1pujkkXijL");
  let lendingProgramid = new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");



  let sourceCollateral = new PublicKey("B1ATuYXNkacjjJS78MAmqu8Lu8PvEPt51u4oBasH1m1g");
  let destinationCollateral = new PublicKey("4U4A8jE3abhBmKxCVGJpChAN2eGHs3GKbrRMh8fiSznS");
  let withdrawReserve = new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36");
  let obligation = new PublicKey("GQocG58f4hfkgj8Q8hjWLznv4TyMQFqf8Z5XDBjAEQbY");
  let lendingMarket = new PublicKey("4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY");
  let lendingMarketAuthority = new PublicKey("DdZR6zRFiUt4S5mg7AV1uKB2z1f1WzcNYCaTEEWPAuby");
  let destinationLiquidity = new PublicKey("6YWQ6NP1M97jTrE7LjetVS898cB9X28AzEecB9APUH7S");
  let reserveCollateralMint = new PublicKey("5h6ssFpeDeRbzsEHDbTQNH7nVGgsKrZydxdSTnLm6QdV");
  let reserveLiquiditySupply = new PublicKey("8UviNr47S8eL6J3WfDxMRa3hvLta1VDJwNWqsDgtN3Cv");
  let obligationOwner = new PublicKey("vqjaEKwZVk3eMa1c8i8PRmFpWrZLoK6xX1CdBxjFYuv");
  let transferAuthority = new PublicKey("vqjaEKwZVk3eMa1c8i8PRmFpWrZLoK6xX1CdBxjFYuv");
  const refreshReserveIx = refreshReserveInstruction(
    reverseAddress,
    solendId,
    priceAddress,
    switchboardFeedAddress
  );
  const refreshObligationIx = refreshObligationInstruction(
    obligation,
    [new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36")],
    [new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36")],
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
    { pubkey: destinationLiquidity, isSigner: false, isWritable: true },
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
