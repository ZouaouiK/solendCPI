import {
  Account,
  Connection,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js'
import {  TOKEN_PROGRAM_ID } from '@solana/spl-token';

export async function initObligation() {
  let programId = new PublicKey('D1Kcu4bSovXHWQQXv38c1vbzwALxncFdbhtyUUEomsn1')
  const connection = new Connection('https://api.devnet.solana.com', {
    commitment: 'finalized',
  })

  const account = new Account([228,174,249,150,242,227,12,108,158,0,58,126,225,230,100,230,172,45,190,52,14,191,245,98,105,190,195,139,208,208,174,239,0,114,142,98,213,128,244,98,58,52,121,75,196,202,170,13,11,16,181,63,104,178,199,69,21,96,220,39,167,87,91,186]);
  const signature = await connection.requestAirdrop(account.publicKey, LAMPORTS_PER_SOL);
  await connection.confirmTransaction(signature);

  let obligationAddress = new Account()
  let lendingMarket = new PublicKey(
    'GvjoVKNjBvQcFaSKUW1gTE7DxhSpjHbE69umVR5nPuQp',
  )
  let owner = account.publicKey
  let obligationProgramID = new PublicKey(
    'ALend7Ketfx5bxh6ghsCDXAoDrhvEmsXT3cynB6aPLgx',
  )
  const OBLIGATION_MARKET_SIZE = 1300
  const lendingAccountInfoRentExempt = await connection.getMinimumBalanceForRentExemption(
    OBLIGATION_MARKET_SIZE,
  )
  const transaction = new Transaction()
  transaction.add(
    SystemProgram.createAccount({
      fromPubkey: owner,
      newAccountPubkey: obligationAddress.publicKey,
      lamports: lendingAccountInfoRentExempt,
       space: OBLIGATION_MARKET_SIZE,
      programId: obligationProgramID,
    }),
  )

  const keys = [
    { pubkey: obligationAddress.publicKey, isSigner: false, isWritable: true },
    { pubkey: lendingMarket, isSigner: false, isWritable: false },
    { pubkey: owner, isSigner: true, isWritable: false },
    { pubkey: obligationProgramID, isSigner: false, isWritable: false },
    { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }
 

  ]

  let data = 6
  const instruction = new TransactionInstruction({
    keys,
    programId,
    data: Buffer.alloc(data), // All instructions are hellos
  })

  transaction.add(instruction)
  let tx = await sendAndConfirmTransaction(connection, transaction, [
    account,
    obligationAddress,
  ])
  console.log('here', tx)
}
