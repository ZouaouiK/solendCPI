use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,

    program_error::ProgramError,
    pubkey::Pubkey, instruction::{AccountMeta, Instruction}, program::{invoke_signed},
};

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation refresh reserve program id : EQT6PJWiZotrWUam7MxcKKbX1hKG7kUEabRQSoHbDGwH
pub fn process_instruction(
    program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let reserve_info = next_account_info(account_info_iter)?;
    let pyth_price_info = next_account_info(account_info_iter)?;
    let switchboard_feed_info = next_account_info(account_info_iter)?;
    let clock = next_account_info(account_info_iter)?;
    let solend_id = next_account_info(account_info_iter)?;
    let authority = next_account_info(account_info_iter)?;
    let create_account = next_account_info(account_info_iter)?;
    let nonce=instruction_data[0];
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
    let mut buf = Vec::new();
    let mut vac_accounts = Vec::new();
    buf.push(3);
    vac_accounts.push(AccountMeta::new(*reserve_info.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*pyth_price_info.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*switchboard_feed_info.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*clock.key, false));

    let ix = Instruction {
        accounts: vac_accounts,
        program_id: *solend_id.key,
        data: buf,
    };
    invoke_signed(
        &ix,
        &[
            reserve_info.clone(),
        pyth_price_info.clone(),
        switchboard_feed_info.clone(),
        clock.clone(),
        solend_id.clone()],
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
