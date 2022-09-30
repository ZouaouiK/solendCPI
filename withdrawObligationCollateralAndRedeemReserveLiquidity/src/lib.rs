use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    instruction::{AccountMeta, Instruction},
    program::invoke,
    pubkey::Pubkey,
};

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation set lending market  // program id :6Q55aUojFsv6KinT5hb2Q79W8BKvPXXYzLrB4XGqnsrj
pub fn process_instruction(
    _program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let reserve_collateral_info = next_account_info(account_info_iter)?;
    let user_collateral_info = next_account_info(account_info_iter)?;
    let reserve_info = next_account_info(account_info_iter)?;
    let obligation_info = next_account_info(account_info_iter)?;
    let lending_market_info = next_account_info(account_info_iter)?;
    let lending_market_authority_info = next_account_info(account_info_iter)?;
    let user_liquidity_info = next_account_info(account_info_iter)?;
    let reserve_collateral_mint_info = next_account_info(account_info_iter)?;
    let reserve_liquidity_supply_info = next_account_info(account_info_iter)?;
    let obligation_owner_info = next_account_info(account_info_iter)?;
    let user_transfer_authority_info = next_account_info(account_info_iter)?;
    let clock = next_account_info(account_info_iter)?;
    let token_program_id = next_account_info(account_info_iter)?;
    let program_id = next_account_info(account_info_iter)?;

    let liquidity_amount = instruction_data[0] as u64;

    let mut buf = Vec::new();
    let mut vac_accounts = Vec::new();

    buf.push(15);
    buf.extend_from_slice(&liquidity_amount.to_le_bytes());

    vac_accounts.push(AccountMeta::new(*reserve_collateral_info.key, false));
    vac_accounts.push(AccountMeta::new(*user_collateral_info.key, false));
    vac_accounts.push(AccountMeta::new(*reserve_info.key, false));
    vac_accounts.push(AccountMeta::new(*obligation_info.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*lending_market_info.key, false));
    vac_accounts.push(AccountMeta::new_readonly( *lending_market_authority_info.key, false ));
    vac_accounts.push(AccountMeta::new(*user_liquidity_info.key, false));
    vac_accounts.push(AccountMeta::new(  *reserve_collateral_mint_info.key,   false ));
    vac_accounts.push(AccountMeta::new(   *reserve_liquidity_supply_info.key,   false ));
    vac_accounts.push(AccountMeta::new_readonly(*obligation_owner_info.key, true));
    vac_accounts.push(AccountMeta::new_readonly(   *user_transfer_authority_info.key,  true   ));
    vac_accounts.push(AccountMeta::new_readonly(*clock.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*token_program_id.key, false));

    let ix = Instruction {
        accounts: vac_accounts,
        program_id: *program_id.key,
        data: buf,
    };
    invoke(
        &ix,
        &[
            reserve_collateral_info.clone(),
            user_collateral_info.clone(),
            reserve_info.clone(),
            obligation_info.clone(),
            lending_market_info.clone(),
            lending_market_authority_info.clone(),
            user_liquidity_info.clone(),
            reserve_collateral_mint_info.clone(),
            reserve_liquidity_supply_info.clone(),
            obligation_owner_info.clone(),
            user_transfer_authority_info.clone(),
            clock.clone(),
            token_program_id.clone(),
            program_id.clone(),
        ],
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
