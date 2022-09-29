import { Account, Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction, LAMPORTS_PER_SOL, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, Token, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import BN from 'bn.js';
import { privateKey } from "../../account";
export async function depositReserveLiquidityAndObligationCollateralI() {
  let programId = new PublicKey("HnqntdM6m6y5xYZKTxhfZYqx6ps2w9GRwGf4YogQXrZE")
  const connection = new Connection('https://api.devnet.solana.com', {
    commitment: "finalized",
  });
  let account = new Account(privateKey)

  console.log(" hello solend ", account.publicKey.toBase58());
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
   
    }
  // console.log("userTokenAccountAddress ",userTokenAccountAddress.toBase58())
//let userTokenAccountAddress = await token.createAccount(account.publicKey);
console.log("userTokenAccountAddress ",userTokenAccountAddress.toBase58())

const userWSOLAccountInfo = await connection.getAccountInfo(
  userTokenAccountAddress
); 

const rentExempt = await Token.getMinBalanceRentForExemptAccount(
  connection
);


  //let userTokenAccountAddress= new PublicKey("6j2K9u91p68nySHzTbTyQHKpkqDWzGjz4U2gSvTLtmvQ")
  let userCollateralAccountAddress= new PublicKey("DymaqucGEGZSDc1V8wgbCyDUphRcWm17qmhc3sLhRXtF")
  let reserveAddress= new PublicKey("5VVLD7BQp8y3bTgyF5ezm1ResyMTR3PhYsT4iHFU8Sxz")//
  let reserveLiquiditySupplyAddress= new PublicKey("furd3XUtjXZ2gRvSsoUts9A5m8cMJNqdsyR2Rt8vY9s")//
  let reserveCollateralMintAddress= new PublicKey("FzwZWRMc3GCqjSrcpVX3ueJc6UpcV6iWWb7ZMsTXE3Gf")
  let lendingMarketAddress= new PublicKey("GvjoVKNjBvQcFaSKUW1gTE7DxhSpjHbE69umVR5nPuQp")
  let lendingMarketAuthorityAddress= new PublicKey("EhJ4fwaXUp7aiwvZThSUaGWCaBQAJe3AEaJJJVCn3UCK")
  let collateralSupplyAddress= new PublicKey("J5KGpESS8Zq2MvK4rtL6wKbeMRYZzb6TEzn8qPsZFgGd")//
  let obligationAddress= new PublicKey("42S5nJQK18VxPoFyN2GbK1HSzLowvzxcjVjDEwYqLtiX")
  let obligationOwnerAddress= new PublicKey("2YUuxfmRCAN1xxJvedMcTbfhSJzLq4Zb4yZXNaEDen55")
  let pythOracleAddress= new PublicKey("J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix")//
  let switchboardFeedAddress= new PublicKey("AdtRGGhmqvom3Jemp5YNrxd9q9unX36BZk1pujkkXijL")//
  let transferAuthority = account.publicKey;
  let solendProgramID = new PublicKey("ALend7Ketfx5bxh6ghsCDXAoDrhvEmsXT3cynB6aPLgx");
  // let liquidityAmount=new BN("1000");
  let liquidityAmount = 100000;

  let create_account = new Account();
  let [authority, nonce] = await PublicKey.findProgramAddress(
    [create_account.publicKey.toBuffer()],
    programId,
  );

  console.log("auth ", authority.toBase58())
  const transaction = new Transaction();

  const keys = [
    
    { pubkey: userTokenAccountAddress, isSigner: false, isWritable: true },//sourceLiquidity
    { pubkey: userCollateralAccountAddress, isSigner: false, isWritable: true },//destinationCollateral
    { pubkey: reserveAddress, isSigner: false, isWritable: true },
    { pubkey: reserveLiquiditySupplyAddress, isSigner: false, isWritable: true },
    { pubkey: reserveCollateralMintAddress, isSigner: false, isWritable: true },
    { pubkey: lendingMarketAddress, isSigner: false, isWritable: true },
    { pubkey: lendingMarketAuthorityAddress, isSigner: false, isWritable: false },
    { pubkey: collateralSupplyAddress, isSigner: false, isWritable: true },
    { pubkey: obligationAddress, isSigner: false, isWritable: true },
    { pubkey: obligationOwnerAddress, isSigner: true, isWritable: false },
    { pubkey: pythOracleAddress, isSigner: false, isWritable: false },
    { pubkey: switchboardFeedAddress, isSigner: false, isWritable: false },
    { pubkey: transferAuthority, isSigner: true, isWritable: false },
    { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: authority, isSigner: false, isWritable: false },
    { pubkey: create_account.publicKey, isSigner: false, isWritable: false },
    { pubkey: solendProgramID, isSigner: false, isWritable: false },
  ];


  const instruction = new TransactionInstruction({
    keys,
    programId,
    data: Buffer.from([liquidityAmount, nonce]), // All instructions are hellos
  });
  transaction.add(instruction);
  console.log(account.publicKey.toBase58())
  let accountInfo = await connection.getAccountInfo(account.publicKey)
  console.log(accountInfo)
  let tx = await sendAndConfirmTransaction(
    connection,
    transaction,
    [account],
  );
  console.log("TX depositReserveLiquidityAndObligation :", tx)
}
export async function depositReserveLiquidityAndObligationCollateralMainnet() {
  //Mainnet
 let programId = new PublicKey("65HwW5H3hsQjmTqmXp673NRcvi4DQA4bsjvDR2wLUXfH");
 let conUrl='https://api.mainnet-beta.solana.com'
  const connection = new Connection(conUrl, {
    commitment: "finalized",
  });
  let account = new Account( privateKey)
 
  console.log(" hello solend ", account.publicKey.toBase58());
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



  let userCollateralAccountAddress= new PublicKey("4U4A8jE3abhBmKxCVGJpChAN2eGHs3GKbrRMh8fiSznS")
  let reserveAddress= new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36")//
  let reserveLiquiditySupplyAddress= new PublicKey("8UviNr47S8eL6J3WfDxMRa3hvLta1VDJwNWqsDgtN3Cv")//
  let reserveCollateralMintAddress= new PublicKey("5h6ssFpeDeRbzsEHDbTQNH7nVGgsKrZydxdSTnLm6QdV")
  let lendingMarketAddress= new PublicKey("4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY")
  let lendingMarketAuthorityAddress= new PublicKey("DdZR6zRFiUt4S5mg7AV1uKB2z1f1WzcNYCaTEEWPAuby")
  let collateralSupplyAddress= new PublicKey("B1ATuYXNkacjjJS78MAmqu8Lu8PvEPt51u4oBasH1m1g")//
  let obligationAddress= new PublicKey("GQocG58f4hfkgj8Q8hjWLznv4TyMQFqf8Z5XDBjAEQbY")
  let obligationOwnerAddress= new PublicKey("vqjaEKwZVk3eMa1c8i8PRmFpWrZLoK6xX1CdBxjFYuv")
  let pythOracleAddress= new PublicKey("H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG")//
  let switchboardFeedAddress= new PublicKey("AdtRGGhmqvom3Jemp5YNrxd9q9unX36BZk1pujkkXijL")//
  let transferAuthority = account.publicKey;
  let solendProgramID = new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");




  let liquidityAmount = 100000;

  let create_account = new Account();
  let [authority, nonce] = await PublicKey.findProgramAddress(
    [create_account.publicKey.toBuffer()],
    programId,
  );

  console.log("auth ", authority.toBase58())
  const transaction = new Transaction();

  const keys = [
    
    { pubkey: userTokenAccountAddress, isSigner: false, isWritable: true },//sourceLiquidity
    { pubkey: userCollateralAccountAddress, isSigner: false, isWritable: true },//destinationCollateral
    { pubkey: reserveAddress, isSigner: false, isWritable: true },
    { pubkey: reserveLiquiditySupplyAddress, isSigner: false, isWritable: true },
    { pubkey: reserveCollateralMintAddress, isSigner: false, isWritable: true },
    { pubkey: lendingMarketAddress, isSigner: false, isWritable: true },
    { pubkey: lendingMarketAuthorityAddress, isSigner: false, isWritable: false },
    { pubkey: collateralSupplyAddress, isSigner: false, isWritable: true },
    { pubkey: obligationAddress, isSigner: false, isWritable: true },
    { pubkey: obligationOwnerAddress, isSigner: true, isWritable: false },
    { pubkey: pythOracleAddress, isSigner: false, isWritable: false },
    { pubkey: switchboardFeedAddress, isSigner: false, isWritable: false },
    { pubkey: transferAuthority, isSigner: true, isWritable: false },
    { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: authority, isSigner: false, isWritable: false },
    { pubkey: create_account.publicKey, isSigner: false, isWritable: false },
    { pubkey: solendProgramID, isSigner: false, isWritable: false },
  ];


  const instruction = new TransactionInstruction({
    keys,
    programId,
    data: Buffer.from([liquidityAmount, nonce]), // All instructions are hellos
  });
  transaction.add(instruction);
  console.log(account.publicKey.toBase58())
  let accountInfo = await connection.getAccountInfo(account.publicKey)
  console.log(accountInfo)
  let tx = await sendAndConfirmTransaction(
    connection,
    transaction,
    [account],
  );
  console.log("TX seposit Reserve Liquidity And Obligation Collateral :", tx)
}
