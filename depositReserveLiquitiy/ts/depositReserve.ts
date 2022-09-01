import { Account,Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction, LAMPORTS_PER_SOL, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import {  TOKEN_PROGRAM_ID,Token, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import BN from 'bn.js';
export async function DepositReserve(){
let programId=new PublicKey("HSXm6BVmJPDg154i2u16p3bEuWziwdGPAeFVXkvJZbWa")
    const connection = new Connection('https://api.devnet.solana.com', {
        commitment: "finalized",
      });
      const account = new Account([228,174,249,150,242,227,12,108,158,0,58,126,225,230,100,230,172,45,190,52,14,191,245,98,105,190,195,139,208,208,174,239,0,114,142,98,213,128,244,98,58,52,121,75,196,202,170,13,11,16,181,63,104,178,199,69,21,96,220,39,167,87,91,186]);
let tokenMint=new PublicKey("So11111111111111111111111111111111111111112");
let userTokenAccountAddress=await Token.getAssociatedTokenAddress(
   ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  tokenMint,
  account.publicKey);
 // console.log("userTokenAccountAddress ",userTokenAccountAddress.toBase58())
 
    // let userTokenAccountAddress=new PublicKey("BKgEqFHQdS2kkHs1RZmsC6FkcmYjFG1C3CYvZR4UHESA");
     let userCollateralAccountAddress=new PublicKey("GXfSDC1iWbhekYWT2puztyyPghdrhaHeAeQck16JZWq");
     let reserveAddress =new PublicKey("5VVLD7BQp8y3bTgyF5ezm1ResyMTR3PhYsT4iHFU8Sxz");
     let reserveLiquidityAddress =new PublicKey("furd3XUtjXZ2gRvSsoUts9A5m8cMJNqdsyR2Rt8vY9s");
     let reserveCollateralMintAddress =new PublicKey("FzwZWRMc3GCqjSrcpVX3ueJc6UpcV6iWWb7ZMsTXE3Gf");
     let lendingMarketAddress  =new PublicKey("GvjoVKNjBvQcFaSKUW1gTE7DxhSpjHbE69umVR5nPuQp"); 
      let lendingMarketAuthorityAddress  =new PublicKey("EhJ4fwaXUp7aiwvZThSUaGWCaBQAJe3AEaJJJVCn3UCK");
      let transferAuthority =account.publicKey;
      let solendProgramID =new PublicKey("ALend7Ketfx5bxh6ghsCDXAoDrhvEmsXT3cynB6aPLgx");
   // let liquidityAmount=new BN("1000");
    let liquidityAmount=1000;
  
    let create_account=new Account();
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
        { pubkey:solendProgramID, isSigner: false, isWritable: false },
      ];
 
         
      const instruction = new TransactionInstruction({
        keys,
         programId,
         data: Buffer.from([liquidityAmount,nonce]), // All instructions are hellos
       });
      transaction.add(instruction);
      let tx= await sendAndConfirmTransaction(
        connection,
        transaction,
        [account],
      ); 
console.log("TX deposit reserve :",tx)
}
