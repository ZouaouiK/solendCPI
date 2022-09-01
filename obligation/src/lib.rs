

use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    instruction::{AccountMeta, Instruction},

    program::invoke,
    pubkey::Pubkey
  
};
entrypoint!(process_instruction);
 pub fn process_instruction(
    _program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    _instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let obligation_pubkey = next_account_info(account_info_iter)?;
    let lending_market_pubkey = next_account_info(account_info_iter)?;
    let obligation_owner_pubkey = next_account_info(account_info_iter)?;
    let obligation_program_id= next_account_info(account_info_iter)?;
    let sys_var_clock = next_account_info(account_info_iter)?;
    let sys_var_rent = next_account_info(account_info_iter)?;
    let spl_token = next_account_info(account_info_iter)?;


    let mut buf = Vec::new();
    let mut vac_accounts = Vec::new();
    buf.push(6);

    vac_accounts.push(AccountMeta::new(*obligation_pubkey.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*lending_market_pubkey.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*obligation_owner_pubkey.key, true));
    vac_accounts.push(AccountMeta::new_readonly(*sys_var_clock.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*sys_var_rent.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*spl_token.key, false));

    let ix = Instruction {
        accounts: vac_accounts,
        program_id: *obligation_program_id.key,
        data: buf,
    };
    invoke(
        &ix,
        &[
            obligation_pubkey.clone(),
            lending_market_pubkey.clone(),
            obligation_owner_pubkey.clone(),
            sys_var_clock.clone(),
            sys_var_rent.clone(),
            spl_token.clone(),
            obligation_program_id.clone()
  
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
