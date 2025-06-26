#[starknet::interface]
pub trait IVotingStarknetV3<TContractState> {
    ///Create a new proposal
    fn create_a_proposal(ref self: TContractState, name: felt252);
    /// Stake Tokens
    fn stake_tokens(ref self: TContractState);
    /// Increase contract balance.
    fn vote_on_proposals(ref self: TContractState, name: felt252);
    /// Retrieve contract balance.
    fn get_staked_tokens_from_current_addr(self: @TContractState) -> u128;
    ///Get total proposals for a person
    fn get_total_proposals_by_name(self: @TContractState, name: felt252) -> usize;
    /// Get all total votes staked
    fn get_total_votes(self: @TContractState) -> usize;
}

/// Simple contract for managing balance.
#[starknet::contract]
pub mod VotingStarknetV3 {
    use starknet::storage::{
        Map, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess,
    };
    use starknet::{ContractAddress, get_caller_address};

    const ONE_TOKEN: u128 = 1;

    #[storage]
    struct Storage {
        tokens: u128,
        staked_tokens: Map<ContractAddress, u128>,
        proposals: Map<felt252, Map<ContractAddress, u128>>,
        proposal_count: Map<felt252, usize>,
        all_votes: usize,
        all_proposals: usize,
    }

    #[constructor]
    fn constructor(ref self: ContractState, init_value: u128, proposals: usize) {
        const ONE_TOKEN: u128 = 1;
        let tokens: u128 = 200000 * ONE_TOKEN;

        self.tokens.write(tokens);
        self.staked_tokens.entry(get_caller_address()).write(init_value);
        self.all_proposals.write(proposals);
    }


    #[abi(embed_v0)]
    impl VotingStarknetV3Impl of super::IVotingStarknetV3<ContractState> {
        fn create_a_proposal(ref self: ContractState, name: felt252) {
            let balance = self.staked_tokens.entry(get_caller_address()).read();
            assert!(balance > ONE_TOKEN / 2, "You can pass");

            self.proposal_count.entry(name).write(self.proposal_count.entry(name).read() + 1);
            self.proposals.entry(name).entry(get_caller_address()).write(ONE_TOKEN / 2);
            self.all_proposals.write(self.all_proposals.read() + 1);
        }

        fn stake_tokens(ref self: ContractState) {
            assert!(self.tokens.read() != 0, "Amount cannot be zero");

            self
                .staked_tokens
                .entry(get_caller_address())
                .write(self.tokens.read() - 10 * ONE_TOKEN);
        }

        fn vote_on_proposals(ref self: ContractState, name: felt252) {
            let balance = self.staked_tokens.entry(get_caller_address()).read();
            assert!(balance < ONE_TOKEN / 2, "Less stake tokens");

            self.proposal_count.entry(name).write(self.proposal_count.entry(name).read() + 1);
            self.proposals.entry(name).entry(get_caller_address()).write(ONE_TOKEN / 2);
            self.all_votes.write(self.all_votes.read() + 1);
        }

        fn get_staked_tokens_from_current_addr(self: @ContractState) -> u128 {
            self.staked_tokens.entry(get_caller_address()).read()
        }

        fn get_total_proposals_by_name(self: @ContractState, name: felt252) -> usize {
            self.proposal_count.entry(name).read()
        }

        fn get_total_votes(self: @ContractState) -> usize {
            self.all_votes.read()
        }
    }
}
