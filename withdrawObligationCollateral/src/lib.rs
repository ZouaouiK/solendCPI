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
    _instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let sourceCollateral = next_account_info(account_info_iter)?;
    let destinationCollateral = next_account_info(account_info_iter)?;
    let withdrawReserve = next_account_info(account_info_iter)?;
    let obligation = next_account_info(account_info_iter)?;
    let lendingMarket = next_account_info(account_info_iter)?;
    let lendingMarketAuthority = next_account_info(account_info_iter)?;
    let obligationOwner = next_account_info(account_info_iter)?;
    let SYSVAR_CLOCK_PUBKEY = next_account_info(account_info_iter)?;
    let TOKEN_PROGRAM_ID = next_account_info(account_info_iter)?;
    let lending_program_id = next_account_info(account_info_iter)?;
  let amount =1000 as u64;
    let mut buf = Vec::new();
    let mut vac_accounts = Vec::new();
    buf.push(9);
    buf.extend_from_slice(&amount.to_le_bytes());
    vac_accounts.push(AccountMeta::new(*sourceCollateral.key, false));
    vac_accounts.push(AccountMeta::new(*destinationCollateral.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*withdrawReserve.key, false));
    vac_accounts.push(AccountMeta::new(*obligation.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*lendingMarket.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*lendingMarketAuthority.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*obligationOwner.key, true));
    vac_accounts.push(AccountMeta::new_readonly(*SYSVAR_CLOCK_PUBKEY.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*TOKEN_PROGRAM_ID.key, false));

    let ix = Instruction {
        accounts: vac_accounts,
        program_id: *lending_program_id.key,
        data: buf,
    };
    invoke(
        &ix,
        &[
            sourceCollateral.clone(),
            destinationCollateral.clone(),
            withdrawReserve.clone(),
            obligation.clone(),
          lendingMarket.clone(),
          lendingMarketAuthority.clone(),
          obligationOwner.clone(),
          SYSVAR_CLOCK_PUBKEY.clone(),
          TOKEN_PROGRAM_ID.clone(),
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
