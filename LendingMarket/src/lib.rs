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

// Program entrypoint's implementation init lending market // Program Id: E1PRiQyUbNbWVJrKtwt8Qb61S2K6yrNWeXPbS56w3p86
/* pub fn process_instruction(
    _program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let lending_market_info = next_account_info(account_info_iter)?;
    let rent = next_account_info(account_info_iter)?;
    let token_program_id = next_account_info(account_info_iter)?;
    let oracle_program_id = next_account_info(account_info_iter)?;
    let switchboard_oracle_program_id = next_account_info(account_info_iter)?;
    let owner = next_account_info(account_info_iter)?;
    let lending_program_id = next_account_info(account_info_iter)?;

    let quote = instruction_data;

    msg!("quote {:?}", quote);
    let mut buf = Vec::new();
    let mut vac_accounts = Vec::new();
    buf.push(0);
    buf.extend_from_slice(owner.key.as_ref());
    buf.extend_from_slice(quote.as_ref());
    vac_accounts.push(AccountMeta::new(*lending_market_info.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*rent.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*token_program_id.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*oracle_program_id.key, false));
    vac_accounts.push(AccountMeta::new_readonly(
        *switchboard_oracle_program_id.key,
        false,
    ));

    let ix = Instruction {
        accounts: vac_accounts,
        program_id: *lending_program_id.key,
        data: buf,
    };
    invoke(
        &ix,
        &[
            lending_market_info.clone(),
            rent.clone(),
            token_program_id.clone(),
            oracle_program_id.clone(),
            switchboard_oracle_program_id.clone(),
            lending_program_id.clone(),
        ],
    )?;
    Ok(())
}
 */
// Program entrypoint's implementation set lending market  // program id :6Q55aUojFsv6KinT5hb2Q79W8BKvPXXYzLrB4XGqnsrj
pub fn process_instruction(
    _program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    _instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let lending_market_info = next_account_info(account_info_iter)?;
    let lending_market_owner = next_account_info(account_info_iter)?;
    let lending_program_id = next_account_info(account_info_iter)?;
   let new_owner=next_account_info(account_info_iter)?;
    let mut buf = Vec::new();
    let mut vac_accounts = Vec::new();
    buf.push(1);
    buf.extend_from_slice(new_owner.key.as_ref());
    vac_accounts.push(AccountMeta::new(*lending_market_info.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*lending_market_owner.key, true));
    let ix = Instruction {
        accounts: vac_accounts,
        program_id: *lending_program_id.key,
        data: buf,
    };
    invoke(
        &ix,
        &[
            lending_market_info.clone(),
            lending_market_owner.clone(),
            lending_program_id.clone(),
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
