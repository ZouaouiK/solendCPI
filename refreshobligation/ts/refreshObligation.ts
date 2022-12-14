import { Account, Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction, LAMPORTS_PER_SOL, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, Token, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import BN from 'bn.js';
export async function refreshObligation() {
  let programId = new PublicKey("6MA7PEj1gUX1J8ja9tnZGy5WVQdTjgLZ47UTdz7Rt1N2")
  const connection = new Connection('https://api.devnet.solana.com', {
    commitment: "finalized",
  });
  //let account = new Account([203, 214, 234, 196, 65, 154, 197, 110, 86, 88, 245, 158, 243, 187, 244, 115, 70, 166, 74, 27, 108, 253, 132, 166, 11, 146, 149, 175, 250, 145, 18, 164, 218, 191, 205, 244, 153, 50, 70, 218, 149, 83, 58, 170, 85, 19, 18, 229, 204, 64, 179, 163, 74, 137, 247, 163, 15, 142, 223, 28, 168, 124, 248, 130]);
  let account = new Account([100,20,230,37,235,65,189,181,77,36,75,183,186,81,40,0,72,14,113,158,77,68,43,36,30,4,204,68,66,32,16,194,22,236,64,226,33,29,106,20,204,149,203,95,186,204,144,172,228,228,195,16,218,163,59,237,147,240,235,175,87,58,142,168])


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



const userWSOLAccountInfo = await connection.getAccountInfo(
  userTokenAccountAddress
); 

const rentExempt = await Token.getMinBalanceRentForExemptAccount(
  connection
);

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


  const transaction = new Transaction();

  const keys = [
    { pubkey: userTokenAccountAddress, isSigner: false, isWritable: true },//sourceLiquidity
    { pubkey: userCollateralAccountAddress, isSigner: false, isWritable: true },//destinationCollateral
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

  let accountInfo = await connection.getAccountInfo(account.publicKey)

  let tx = await sendAndConfirmTransaction(
    connection,
    transaction,
    [account],
  );
  console.log("TX refreshObligation :", tx)
}
