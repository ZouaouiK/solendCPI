import { Account, Connection, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction, LAMPORTS_PER_SOL, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, Token } from '@solana/spl-token';
import BN from 'bn.js';
import { privateKey } from "../../account";

export async function repayObligationLiquidityWithMainnet() {
  let programId = new PublicKey("8PzGg5TDqLwdgVZA52rVbwY1tEzncdhq1iouvfEfNhFW")
  const connection = new Connection('https://api.mainnet-beta.solana.com', {
    commitment: "finalized",
  });

  let lendingProgramid = new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");

  const account = new Account(privateKey);


  let sourceLiquidity = new PublicKey("6YWQ6NP1M97jTrE7LjetVS898cB9X28AzEecB9APUH7S");
  let destinationLiquidity = new PublicKey("8UviNr47S8eL6J3WfDxMRa3hvLta1VDJwNWqsDgtN3Cv");
  let repayReserve = new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36");
  let obligation = new PublicKey("GQocG58f4hfkgj8Q8hjWLznv4TyMQFqf8Z5XDBjAEQbY");
  let lendingMarket = new PublicKey("4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY");




  const transaction = new Transaction();








  const keys = [
    { pubkey: sourceLiquidity, isSigner: false, isWritable: true },
    { pubkey: destinationLiquidity, isSigner: false, isWritable: true },
    { pubkey: repayReserve, isSigner: false, isWritable: true },
    { pubkey: obligation, isSigner: false, isWritable: true },
    { pubkey: lendingMarket, isSigner: false, isWritable: true },
    { pubkey: account.publicKey, isSigner: true, isWritable: false },
    { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: lendingProgramid, isSigner: false, isWritable: false },

  ];
  let collateralAmount = 10;
  const instruction = new TransactionInstruction({
    keys,
    programId,
    data:  Buffer.from([collateralAmount]), // All instructions are hellos
  });
  transaction.add(instruction);
  let tx = await sendAndConfirmTransaction(
    connection,
    transaction,
    [account],
  );
  console.log("TX repay Obligation Liquidity Instruction With Mainnet : ", tx)
}
