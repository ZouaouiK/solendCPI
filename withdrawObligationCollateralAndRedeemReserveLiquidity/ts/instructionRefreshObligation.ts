import {
    PublicKey,
    SYSVAR_CLOCK_PUBKEY,
    TransactionInstruction,
  } from "@solana/web3.js";
  import BufferLayout from "buffer-layout";
  
  /// Refresh an obligation"s accrued interest and collateral and liquidity prices. Requires
  /// refreshed reserves, as all obligation collateral deposit reserves in order, followed by all
  /// liquidity borrow reserves in order.
  ///
  /// Accounts expected by this instruction:
  ///
  ///   0. `[writable]` Obligation account.
  ///   1. `[]` Clock sysvar.
  ///   .. `[]` Collateral deposit reserve accounts - refreshed, all, in order.
  ///   .. `[]` Liquidity borrow reserve accounts - refreshed, all, in order.
  export const refreshObligationInstruction = (
    obligation: PublicKey,
    depositReserves: PublicKey[],
    borrowReserves: PublicKey[],
    solendProgramAddress: PublicKey
  ): TransactionInstruction => {
    const dataLayout = BufferLayout.struct([BufferLayout.u8("instruction")]);
  
    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      { instruction: 7},
      data
    );
  
    let obligation1= new PublicKey("ARY5UYV5ZKSiYKeUR4UWp94cdoTZPRUYVr2omQ8SNqVF")
    let solendProgramAddress1= new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo")//
    
    const keys = [
      { pubkey: obligation1, isSigner: false, isWritable: true },
      { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
    ];
    
    depositReserves.forEach((depositReserves) =>
    {
      let depositReserve1= new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36")//
  
      //console.log("depositReserve",depositReserve.toBase58())
      keys.push({
      pubkey: depositReserve1,
      isSigner: false,
      isWritable: false,
    })}
  );
  borrowReserves.forEach((borrowReserve) =>
  {
    let borrowReserve1= new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36")//
  
    console.log("borrowReserve",borrowReserve)
    keys.push({
      pubkey: borrowReserve1,
      isSigner: false,
      isWritable: false,
    })
  }
  );
   /*  depositReserves.forEach((depositReserve) =>
      keys.push({
        pubkey: depositReserve,
        isSigner: false,
        isWritable: false,
      })
    );
    borrowReserves.forEach((borrowReserve) =>
      keys.push({
        pubkey: borrowReserve,
        isSigner: false,
        isWritable: false,
      })
    ); */
    return new TransactionInstruction({
      keys,
      programId: solendProgramAddress1,
      data,
    });
  };
  