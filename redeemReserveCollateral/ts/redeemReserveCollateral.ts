import { Account, Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction, LAMPORTS_PER_SOL, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, Token, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import BN from 'bn.js';
import { privateKey } from "../../account";
export async function redeemReserveCollateral() {
  let programId = new PublicKey("98MvzPgeR6WK5HV4US1icZheF73z6Q1EQLiEkMouYQAk")
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


  //let userTokenAccountAddress=new PublicKey("6j2K9u91p68nySHzTbTyQHKpkqDWzGjz4U2gSvTLtmvQ");
  let userCollateralAccountAddress = new PublicKey("DymaqucGEGZSDc1V8wgbCyDUphRcWm17qmhc3sLhRXtF");
  let reserveAddress = new PublicKey("5VVLD7BQp8y3bTgyF5ezm1ResyMTR3PhYsT4iHFU8Sxz");
  let reserveLiquidityAddress = new PublicKey("furd3XUtjXZ2gRvSsoUts9A5m8cMJNqdsyR2Rt8vY9s");
  let reserveCollateralMintAddress = new PublicKey("FzwZWRMc3GCqjSrcpVX3ueJc6UpcV6iWWb7ZMsTXE3Gf");
  let lendingMarketAddress = new PublicKey("GvjoVKNjBvQcFaSKUW1gTE7DxhSpjHbE69umVR5nPuQp");
  let lendingMarketAuthorityAddress = new PublicKey("EhJ4fwaXUp7aiwvZThSUaGWCaBQAJe3AEaJJJVCn3UCK");
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
    { pubkey: userCollateralAccountAddress, isSigner: false, isWritable: true },//sourceCollateral
    { pubkey: userTokenAccountAddress, isSigner: false, isWritable: true },//destinationLiquidity
    { pubkey: reserveAddress, isSigner: false, isWritable: true },
    { pubkey: reserveLiquidityAddress, isSigner: false, isWritable: true },
    { pubkey: reserveCollateralMintAddress, isSigner: false, isWritable: true },
    { pubkey: lendingMarketAddress, isSigner: false, isWritable: false },
    { pubkey: lendingMarketAuthorityAddress, isSigner: false, isWritable: false },
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
  console.log("TX deposit reserve :", tx)
}
export async function redeemReserveCollateralWithMainnet() {
  let programId = new PublicKey("4jboXeejSrHiGMZDnWu3qWXp3gx1JK8mzbD51oVoTgCE")
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
   
    }

  

  let userCollateralAccountAddress = new PublicKey("9ymG8DFRvVyrwbLZQdRCLXmduvDTGYUrbV7KRzZtKqpW");
  //let userTokenAccountAddress=new PublicKey("HBfM67smbe15TKPSG5b3UfJFCqR1ENLWvw1WLXfTq2pJ");
  let reserveAddress = new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36");
  let reserveCollateralMintAddress = new PublicKey("5h6ssFpeDeRbzsEHDbTQNH7nVGgsKrZydxdSTnLm6QdV");
  let reserveLiquidityAddress = new PublicKey("8UviNr47S8eL6J3WfDxMRa3hvLta1VDJwNWqsDgtN3Cv");
  let lendingMarketAddress = new PublicKey("4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY");
  let lendingMarketAuthorityAddress = new PublicKey("DdZR6zRFiUt4S5mg7AV1uKB2z1f1WzcNYCaTEEWPAuby");
  let transferAuthority = account.publicKey;
  let solendProgramID = new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");
  // let liquidityAmount=new BN("1000");
  let liquidityAmount = 10000;

  let create_account = new Account();
  let [authority, nonce] = await PublicKey.findProgramAddress(
    [create_account.publicKey.toBuffer()],
    programId,
  );

  console.log("auth ", authority.toBase58())
  const transaction = new Transaction();

  const keys = [
    { pubkey: userCollateralAccountAddress, isSigner: false, isWritable: true },//sourceCollateral
    { pubkey: userTokenAccountAddress, isSigner: false, isWritable: true },//destinationLiquidity
    { pubkey: reserveAddress, isSigner: false, isWritable: true },
    { pubkey: reserveCollateralMintAddress, isSigner: false, isWritable: true },
    { pubkey: reserveLiquidityAddress, isSigner: false, isWritable: true },
    { pubkey: lendingMarketAddress, isSigner: false, isWritable: false },
    { pubkey: lendingMarketAuthorityAddress, isSigner: false, isWritable: false },
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
  console.log("TX deposit reserve :", tx)
}

