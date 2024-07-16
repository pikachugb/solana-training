use anchor_lang::prelude::*;

declare_id!("4iwv58V8MnVpvtz4Wb9eDHhvrxqoJ1gY3sZ1nf292GoP");

#[program]
pub mod lesson_7 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
