use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,

    program_error::ProgramError,
    pubkey::Pubkey, instruction::{AccountMeta, Instruction}, program::{invoke_signed, invoke},
};
use solana_program::msg;
// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation deposit reserve program id : HSXm6BVmJPDg154i2u16p3bEuWziwdGPAeFVXkvJZbWa
pub fn process_instruction(
    _program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    msg!("Instruction: repay Obligation Liquidity");
    let account_info_iter = &mut accounts.iter();
    let source_liquidity_info = next_account_info(account_info_iter)?;
    let destination_liquidity_info = next_account_info(account_info_iter)?;
    let repay_reserve_info = next_account_info(account_info_iter)?;
    let obligation_info = next_account_info(account_info_iter)?;
    let lending_market_info = next_account_info(account_info_iter)?;
    let user_transfer_authority_pubkey = next_account_info(account_info_iter)?;
    let clock  = next_account_info(account_info_iter)?;
    let token_program_id = next_account_info(account_info_iter)?;
    let solend_program_id = next_account_info(account_info_iter)?;


    let liquidity_amount=instruction_data[0] as u64;
   // let liquidity_amount: u64=10000;
    let mut buf = Vec::new();
    let mut vac_accounts = Vec::new();


    buf.push(11);
    buf.extend_from_slice(&liquidity_amount.to_le_bytes());




    vac_accounts.push(AccountMeta::new(*source_liquidity_info.key, false));
    vac_accounts.push(AccountMeta::new(*destination_liquidity_info.key, false));
    vac_accounts.push(AccountMeta::new(*repay_reserve_info.key, false));
    vac_accounts.push(AccountMeta::new(*obligation_info.key, false));
    vac_accounts.push(AccountMeta::new(*lending_market_info.key, false));
    vac_accounts.push(AccountMeta::new(*user_transfer_authority_pubkey.key, true));
    vac_accounts.push(AccountMeta::new_readonly(*clock.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*token_program_id.key, false));
    let ix = Instruction {
        accounts: vac_accounts,
        program_id: *solend_program_id.key,
        data: buf,
    };
    msg!("Instruction:  Serum Swap borrowObligationLiquidity************444444");
    invoke(
        &ix,
        &[
            source_liquidity_info.clone(),
            destination_liquidity_info.clone(),
            repay_reserve_info.clone(),
            obligation_info.clone(),
            lending_market_info.clone(),
            user_transfer_authority_pubkey.clone(),
            clock.clone(),
            token_program_id.clone(),
            solend_program_id.clone()
               ],
        )?;
        Ok(())
       


}
