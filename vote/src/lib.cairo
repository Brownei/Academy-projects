/// Interface representing `HelloContract`.
/// This interface allows modification and retrieval of the contract balance.
#[starknet::interface]
pub trait IVoteStarknet<TContractState> {
    ///Create a new proposal
    fn create_a_proposal(ref self: TContractState, addr: felt252, amount: u32);
    /// Stake Tokens
    fn stake_tokens(ref self: TContractState, amount: felt252);
    /// Increase contract balance.
    fn vote_on_proposals(ref self: TContractState, name: felt252, vote: u32);
    /// Retrieve contract balance.
    fn get_balance(self: @TContractState) -> felt252;
}

/// Simple contract for managing balance.
#[starknet::contract]
mod VoteStarknet {
    use starknet::storage::{
        Map, StorageMapWriteAccess, StoragePointerReadAccess, StoragePointerWriteAccess,
    };
    use starknet::{ContractAddress, get_caller_address};

    #[storage]
    struct Storage {
        balance: felt252,
        staked_tokens: felt252,
        proposals: Map<(u32, ContractAddress), u32>,
        genesis_proposal: Map<felt252, u32>,
        proposal_count: usize,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        self.genesis_proposal.write('Genesis', 0);
        self.proposals.write((1, get_caller_address()), 0);

        let index = self.proposal_count.read();
        self.proposal_count.write(index + 1);
    }


    #[abi(embed_v0)]
    impl VoteStarknetImpl of super::IVoteStarknet<ContractState> {
        fn create_a_proposal(ref self: ContractState, addr: felt252, amount: u32) {}

        fn stake_tokens(ref self: ContractState, amount: felt252) {
            assert(amount != 0, 'Amount cannot be zero');
            self.staked_tokens.write(self.balance.read() - amount)
        }

        fn vote_on_proposals(ref self: ContractState, name: felt252, vote: u32) {}

        fn get_balance(self: @ContractState) -> felt252 {
            self.balance.read()
        }
    }
}
