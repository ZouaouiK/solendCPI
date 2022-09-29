import { Account, Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction, LAMPORTS_PER_SOL, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, Token, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import BN from 'bn.js';
import { privateKey } from "../../account";
export async function depositObligationCollateral() {
  let programId = new PublicKey("F7P36ZUZnD6uTb2Y9i8ayM98z2z8dwyVebSKnbVfNiKu")
  const connection = new Connection('https://api.devnet.solana.com', {
    commitment: "finalized",
  });
  let account =new Account(privateKey)
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
  // console.log("userTokenAccountAddress ",userTokenAccountAddress.toBase58())
 let token = new Token(connection,tokenMint,TOKEN_PROGRAM_ID,account);
//let userTokenAccountAddress = await token.createAccount(account.publicKey);
console.log("userTokenAccountAddress ",userTokenAccountAddress.toBase58())

const userWSOLAccountInfo = await connection.getAccountInfo(
  userTokenAccountAddress
); 

const rentExempt = await Token.getMinBalanceRentForExemptAccount(
  connection
);

 //const sendAction = "mint";

  //let userTokenAccountAddress=new PublicKey("6j2K9u91p68nySHzTbTyQHKpkqDWzGjz4U2gSvTLtmvQ");
  let userCollateralAccountAddress = new PublicKey("DymaqucGEGZSDc1V8wgbCyDUphRcWm17qmhc3sLhRXtF");
  let collateralSupplyAddress = new PublicKey("J5KGpESS8Zq2MvK4rtL6wKbeMRYZzb6TEzn8qPsZFgGd");
  let reserveAddress = new PublicKey("5VVLD7BQp8y3bTgyF5ezm1ResyMTR3PhYsT4iHFU8Sxz");
  let obligationAddress = new PublicKey("42S5nJQK18VxPoFyN2GbK1HSzLowvzxcjVjDEwYqLtiX");
  let lendingMarketAddress = new PublicKey("GvjoVKNjBvQcFaSKUW1gTE7DxhSpjHbE69umVR5nPuQp");
  let obligationOwnerAddress = new PublicKey("2YUuxfmRCAN1xxJvedMcTbfhSJzLq4Zb4yZXNaEDen55");
  let transferAuthority = account.publicKey;
  let solendProgramID = new PublicKey("ALend7Ketfx5bxh6ghsCDXAoDrhvEmsXT3cynB6aPLgx");
  // let collateralAmount=new BN("1000");
  let collateralAmount = 1000;

  let create_account = new Account();
  let [authority, nonce] = await PublicKey.findProgramAddress(
    [create_account.publicKey.toBuffer()],
    programId,
  );

  console.log("authority ", authority.toBase58())
  const transaction = new Transaction();

  const keys = [
    { pubkey: userCollateralAccountAddress, isSigner: false, isWritable: true }, //sourceCollateral
    { pubkey: collateralSupplyAddress, isSigner: false, isWritable: true }, //destinationCollateral
    { pubkey: reserveAddress, isSigner: false, isWritable: true }, //depositReserve
    { pubkey: obligationAddress, isSigner: false, isWritable: true },
    { pubkey: lendingMarketAddress, isSigner: false, isWritable: false },
    { pubkey: obligationOwnerAddress, isSigner: true, isWritable: false },
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
    data: Buffer.from([collateralAmount, nonce]), // All instructions are hellos
  });
  transaction.add(instruction);
  console.log("account.publicKey"+account.publicKey.toBase58())
  let accountInfo = await connection.getAccountInfo(account.publicKey)
  console.log(accountInfo)
  let tx = await sendAndConfirmTransaction(
    connection,
    transaction,
    [account],
  );
  console.log("TX deposit Obligation Collateral :", tx)
}
export async function depositObligationCollaterallWithMainnet() {
  let programId = new PublicKey("8bVNJ8T9k1QFLGnL1PxusA6kfgYvZQuSfvu7viJhzoGe")
  const connection = new Connection('https://api.mainnet-beta.solana.com', {
    commitment: "finalized",
  });
  let account =new Account(privateKey)
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
  // console.log("userTokenAccountAddress ",userTokenAccountAddress.toBase58())
 let token = new Token(connection,tokenMint,TOKEN_PROGRAM_ID,account);
//let userTokenAccountAddress = await token.createAccount(account.publicKey);
console.log("userTokenAccountAddress ",userTokenAccountAddress.toBase58())

const userWSOLAccountInfo = await connection.getAccountInfo(
  userTokenAccountAddress
); 

const rentExempt = await Token.getMinBalanceRentForExemptAccount(
  connection
);

 //const sendAction = "mint";

  
  //let userTokenAccountAddress=new PublicKey("HBfM67smbe15TKPSG5b3UfJFCqR1ENLWvw1WLXfTq2pJ");
  let userCollateralAccountAddress = new PublicKey("9ymG8DFRvVyrwbLZQdRCLXmduvDTGYUrbV7KRzZtKqpW");
  let collateralSupplyAddress = new PublicKey("B1ATuYXNkacjjJS78MAmqu8Lu8PvEPt51u4oBasH1m1g");
  let reserveAddress = new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36");
  let obligationAddress = new PublicKey("8FhYWpQHJJrR9hL6KAicBxLDQuUCF9XBeoqxvokosGs9");
  let lendingMarketAddress = new PublicKey("4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY");
  let obligationOwnerAddress = new PublicKey("9DjUboaxVyxV4vfCoGzFxpXvWqppNBNWn1UxdhMxuSeJ");
  let transferAuthority = account.publicKey;
  let solendProgramID = new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");
  // let collateralAmount=new BN("1000");
  let collateralAmount = 1000;

  let create_account = new Account();
  let [authority, nonce] = await PublicKey.findProgramAddress(
    [create_account.publicKey.toBuffer()],
    programId,
  );

  console.log("authority ", authority.toBase58())
  const transaction = new Transaction();

  const keys = [
    { pubkey: userCollateralAccountAddress, isSigner: false, isWritable: true }, //sourceCollateral
    { pubkey: collateralSupplyAddress, isSigner: false, isWritable: true }, //destinationCollateral
    { pubkey: reserveAddress, isSigner: false, isWritable: true }, //depositReserve
    { pubkey: obligationAddress, isSigner: false, isWritable: true },
    { pubkey: lendingMarketAddress, isSigner: false, isWritable: false },
    { pubkey: obligationOwnerAddress, isSigner: true, isWritable: false },
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
    data: Buffer.from([collateralAmount, nonce]), // All instructions are hellos
  });
  transaction.add(instruction);
  console.log("account.publicKey"+account.publicKey.toBase58())
  let accountInfo = await connection.getAccountInfo(account.publicKey)
  console.log(accountInfo)
  let tx = await sendAndConfirmTransaction(
    connection,
    transaction,
    [account],
  );
  console.log("TX deposit Obligation Collateral :", tx)
}
