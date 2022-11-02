import {
  PublicKey,
  SYSVAR_CLOCK_PUBKEY,
  TransactionInstruction,
} from "@solana/web3.js";
import BufferLayout from "buffer-layout";


/// Accrue interest and update market price of liquidity on a reserve.
///
/// Accounts expected by this instruction:
///
///   0. `[writable]` Reserve account.
///   1. `[]` Clock sysvar.
///   2. `[optional]` Reserve liquidity oracle account.
///                     Required if the reserve currency is not the lending market quote
///                     currency.
export const refreshReserveInstruction = (
  reserve: PublicKey,
  solendProgramAddress: PublicKey,
  oracle?: PublicKey,
  switchboardFeedAddress?: PublicKey
): TransactionInstruction => {
  const dataLayout = BufferLayout.struct([BufferLayout.u8("instruction")]);

  const data = Buffer.alloc(dataLayout.span);
  dataLayout.encode({ instruction: 3}, data);

  let reserve1= new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36")
  let solendProgramAddress1= new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo")
  let oracle1= new PublicKey("H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG")//
  let switchboardFeedAddress1= new PublicKey("GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR")//

  const keys = [{ pubkey: reserve1, isSigner: false, isWritable: true }];

  if (oracle) {
    keys.push({ pubkey: oracle1, isSigner: false, isWritable: false });
  }
  if (switchboardFeedAddress) {
    keys.push({
      pubkey: switchboardFeedAddress1,
      isSigner: false,
      isWritable: false,
    });
  }

  keys.push({
    pubkey: SYSVAR_CLOCK_PUBKEY,
    isSigner: false,
    isWritable: false,
  });
  return new TransactionInstruction({
    keys,
    programId: solendProgramAddress1,
    data,
  });
};
