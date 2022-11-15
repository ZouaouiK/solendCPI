import { Account, Connection, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction, LAMPORTS_PER_SOL, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, Token } from '@solana/spl-token';
import BN from 'bn.js';
import { privateKey } from "../../account";
import { refreshObligationInstruction } from "./instructionRefreshObligation";
import { refreshReserveInstruction } from "./instructionRefreshReserve";

export async function borrowObligationLiquidityWithMainnet() {
  let programId = new PublicKey("9WirEBoGHzb9j2TRN1c7zbLTivyo7qDMka8nKMNvte5v")
  const connection = new Connection('https://api.mainnet-beta.solana.com', {
    commitment: "finalized",
  });


  const account = new Account(privateKey);
  let reverseAddress = new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36");
  let solendId = new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");
  let priceAddress = new PublicKey("H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG");
  let switchboardFeedAddress = new PublicKey("GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR");
  let lendingProgramid = new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");
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
  // console.log("userTokenAccountAddress ",userTokenAccountAddress.toBase58())
 let token = new Token(connection,tokenMint,TOKEN_PROGRAM_ID,account);
//let userTokenAccountAddress = await token.createAccount(account.publicKey);
console.log("userTokenAccountAddress ",userTokenAccountAddress.toBase58())

  let sourceLiquidity = new PublicKey("8UviNr47S8eL6J3WfDxMRa3hvLta1VDJwNWqsDgtN3Cv");
  let destinationLiquidity = new PublicKey("BR1qCPSBeyxRR9Dxi8hry8kbWz64vtx5FwDp5XP4hL3a");
  let borrowReserve = new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36");
  let borrowReserveLiquidityFeeReceiver = new PublicKey("5wo1tFpi4HaVKnemqaXeQnBEpezrJXcXvuztYaPhvgC7");
  let obligation = new PublicKey("ARY5UYV5ZKSiYKeUR4UWp94cdoTZPRUYVr2omQ8SNqVF");
  let lendingMarket = new PublicKey("4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY");
  let lendingMarketAuthority = new PublicKey("DdZR6zRFiUt4S5mg7AV1uKB2z1f1WzcNYCaTEEWPAuby");


  

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
    { pubkey: sourceLiquidity, isSigner: false, isWritable: true },
    { pubkey: userTokenAccountAddress, isSigner: false, isWritable: true },
    { pubkey: borrowReserve, isSigner: false, isWritable: false },
    { pubkey: borrowReserveLiquidityFeeReceiver, isSigner: false, isWritable: true },
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
  let tx = await sendAndConfirmTransaction(
    connection,
    transaction,
    [account],
  );
  console.log("TX brow Obligation Collateral Instruction With Mainnet : ", tx)
}
