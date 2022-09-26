use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,

    program_error::ProgramError,
    pubkey::Pubkey, instruction::{AccountMeta, Instruction}, program::{invoke_signed},
};
use solana_program::msg;
// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation deposit reserve program id : HSXm6BVmJPDg154i2u16p3bEuWziwdGPAeFVXkvJZbWa
pub fn process_instruction(
    program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    msg!("Instruction:  Serum Swap collateral_amount");
    let account_info_iter = &mut accounts.iter();
    let source_collateral_info = next_account_info(account_info_iter)?;
    let destination_collateral_info = next_account_info(account_info_iter)?;
    let deposit_reserve_info = next_account_info(account_info_iter)?;
    let obligation_info = next_account_info(account_info_iter)?;
    let lending_market_info = next_account_info(account_info_iter)?;
    let obligation_owner_info = next_account_info(account_info_iter)?;
    let user_transfer_authority_info = next_account_info(account_info_iter)?;
    let clock = next_account_info(account_info_iter)?;
    let token_program_id = next_account_info(account_info_iter)?;
    let authority=next_account_info(account_info_iter)?;
    let create_account=next_account_info(account_info_iter)?;
    let solend_program_id=next_account_info(account_info_iter)?;
    let nonce=instruction_data[1];
    //let collateral_amount=instruction_data[0] as u64;
    let collateral_amount: u64=10000;
    let mut buf = Vec::new();
    let mut vac_accounts = Vec::new();
    let signature_seeds = [&create_account.key.to_bytes()[..32], &[nonce]];
    let signers = &[&signature_seeds[..]];

    let expected_allocated_key = Pubkey::create_program_address(
        &[&create_account.key.to_bytes()[..32], &[nonce]],
        program_id,
    )?;

   // Check cross program signature
    if *authority.key != expected_allocated_key {
        return Err(ProgramError::InvalidArgument);
    } 
    buf.push(8);
    buf.extend_from_slice(&collateral_amount.to_le_bytes());

    vac_accounts.push(AccountMeta::new(*source_collateral_info.key, false));
    vac_accounts.push(AccountMeta::new(*destination_collateral_info.key, false));
    vac_accounts.push(AccountMeta::new(*deposit_reserve_info.key, false));
    vac_accounts.push(AccountMeta::new(*obligation_info.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*lending_market_info.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*obligation_owner_info.key, true));
    vac_accounts.push(AccountMeta::new_readonly(*user_transfer_authority_info.key, true));
    vac_accounts.push(AccountMeta::new_readonly(*clock.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*token_program_id.key, false));
    let ix = Instruction {
        accounts: vac_accounts,
        program_id: *solend_program_id.key,
        data: buf,
    };
    invoke_signed(
        &ix,
        &[
            source_collateral_info.clone(),
            destination_collateral_info.clone(),
            deposit_reserve_info.clone(),
            obligation_info.clone(),
            lending_market_info.clone(),
            obligation_owner_info.clone(),
            user_transfer_authority_info.clone(),
            clock.clone(),
            token_program_id.clone(),
            solend_program_id.clone()],
        signers
    )?;
       

    Ok(())
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}
