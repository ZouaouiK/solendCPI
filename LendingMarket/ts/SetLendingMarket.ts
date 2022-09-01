import { Account, Connection, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction } from "@solana/web3.js";

export async function setLendingMarket(){
    let programId=new PublicKey("6Q55aUojFsv6KinT5hb2Q79W8BKvPXXYzLrB4XGqnsrj")
    const connection = new Connection('https://api.devnet.solana.com', {
        commitment: "finalized",
      });
  
     
    const account = new Account([228,174,249,150,242,227,12,108,158,0,58,126,225,230,100,230,172,45,190,52,14,191,245,98,105,190,195,139,208,208,174,239,0,114,142,98,213,128,244,98,58,52,121,75,196,202,170,13,11,16,181,63,104,178,199,69,21,96,220,39,167,87,91,186]);
    const signature = await connection.requestAirdrop(account.publicKey, LAMPORTS_PER_SOL);
    await connection.confirmTransaction(signature);
    let owner=account.publicKey;
    let lendingProgramid=new PublicKey("ALend7Ketfx5bxh6ghsCDXAoDrhvEmsXT3cynB6aPLgx");

    let lendinMarket=new PublicKey("ACqMyAc9qDv5RVcNa3d9VdbR1fQjpeTAFcyyeLtcP3Z3");
    let new_owner=new Account([34,123,210,218,164,123,224,69,136,37,116,107,41,87,42,144,28,219,250,20,231,140,20,89,186,148,227,204,110,54,2,244,39,115,231,170,211,6,234,32,17,25,190,86,89,165,195,0,206,177,85,245,139,100,174,217,207,22,73,181,30,250,59,101]);
    const signature1 = await connection.requestAirdrop(new_owner.publicKey, LAMPORTS_PER_SOL);
    await connection.confirmTransaction(signature1);
    const keys = [
        { pubkey: lendinMarket, isSigner: false, isWritable: true },
        { pubkey: owner, isSigner: true, isWritable: false },      
        { pubkey: lendingProgramid, isSigner: false, isWritable: false }, 
        { pubkey: new_owner.publicKey, isSigner: false, isWritable: false },
    ];
    const transaction = new Transaction();
    const instruction = new TransactionInstruction({
        keys,
         programId,
         data: Buffer.alloc(0), // All instructions are hellos
       });
      transaction.add(instruction);
      let tx= await sendAndConfirmTransaction(
        connection,
        transaction,
        [account],
      ); 
console.log("TX setLending market  ",tx)
}
