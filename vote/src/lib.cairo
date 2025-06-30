#[starknet::interface]
pub trait IVotingStarknetV4<TContractState> {
    fn create_a_proposal(ref self: TContractState, name: felt252);
    fn stake_tokens(ref self: TContractState);
    fn vote_on_proposals(ref self: TContractState, name: felt252);
    fn get_staked_tokens_from_current_addr(self: @TContractState) -> u32;
    fn get_total_proposals_by_name(self: @TContractState, name: felt252) -> u32;
    fn get_tokens(self: @TContractState) -> u32;
    fn get_proposals_made_by_addr_through_name(self: @TContractState, name: felt252) -> u32;
    fn get_total_votes(self: @TContractState) -> u32;
}

/// Simple contract for managing balance.
#[starknet::contract]
pub mod VotingStarknetV4 {
    use starknet::storage::{
        Map, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess,
    };
    use starknet::{ContractAddress, get_caller_address};
    use super::IVotingStarknetV4;

    #[storage]
    struct Storage {
        tokens: u32,
        staked_tokens: Map<ContractAddress, u32>,
        proposals: Map<felt252, Map<ContractAddress, u32>>,
        proposal_count: Map<felt252, u32>,
        all_votes: u32,
        all_proposals: u32,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        TokenIncrease: TokenIncrease,
        TokenDecrease: TokenDecrease,
        StakedTokensIncrease: StakedTokensIncrease,
        StakedTokensDecrease: StakedTokensDecrease,
        AllVotesIncrease: AllVotesIncrease,
        AllProposalIncrease: AllProposalIncrease,
    }

    #[derive(Drop, starknet::Event)]
    pub struct StakedTokensIncrease {
        pub tokens: u32,
    }

    #[derive(Drop, starknet::Event)]
    pub struct StakedTokensDecrease {
        pub tokens: u32,
    }

    #[derive(Drop, starknet::Event)]
    pub struct TokenIncrease {
        pub tokens: u32,
    }

    #[derive(Drop, starknet::Event)]
    pub struct TokenDecrease {
        pub tokens: u32,
    }

    #[derive(Drop, starknet::Event)]
    pub struct AllVotesIncrease {
        pub all_votes: u32,
    }

    #[derive(Drop, starknet::Event)]
    pub struct AllProposalIncrease {
        pub all_proposals: u32,
    }

    #[constructor]
    fn constructor(ref self: ContractState, init_value: u32, proposals: u32) {
        self.tokens.write(init_value);
        self.all_proposals.write(proposals);
    }


    #[abi(embed_v0)]
    impl VotingStarknetV4Impl of IVotingStarknetV4<ContractState> {
        fn get_tokens(self: @ContractState) -> u32 {
            self.tokens.read()
        }

        fn create_a_proposal(ref self: ContractState, name: felt252) {
            let balance: u32 = self.staked_tokens.entry(get_caller_address()).read();
            let new_all_proposals = self.all_proposals.read() + 1;

            self.proposal_count.entry(name).write(self.proposal_count.entry(name).read() + 1);
            self.proposals.entry(name).entry(get_caller_address()).write(balance - 20);
            self.all_proposals.write(new_all_proposals);
            self.emit(AllProposalIncrease { all_proposals: new_all_proposals })
        }

        fn stake_tokens(ref self: ContractState) {
            let old_tokens = self.tokens.read();
            let new_tokens = old_tokens - 15;
            self.staked_tokens.entry(get_caller_address()).write(15);

            self.tokens.write(new_tokens);
            self.emit(TokenDecrease { tokens: new_tokens });
            self.emit(StakedTokensIncrease { tokens: 15 });
        }

        fn vote_on_proposals(ref self: ContractState, name: felt252) {
            let old_all_votes = self.all_votes.read();
            let new_all_votes = old_all_votes + 1;
            let current_tokens = self.get_staked_tokens_from_current_addr();
            let new_tokens = current_tokens - 1;
            let expected_proposal_count = self.get_total_proposals_by_name(name) + 1;

            self.proposal_count.entry(name).write(self.proposal_count.entry(name).read() + 1);
            self.proposals.entry(name).entry(get_caller_address()).write(1);
            self.all_votes.write(new_all_votes);
            self.staked_tokens.entry(get_caller_address()).write(new_tokens);
            self.emit(AllVotesIncrease { all_votes: new_all_votes });
            self.emit(AllProposalIncrease { all_proposals: expected_proposal_count });
            self.emit(StakedTokensDecrease { tokens: new_tokens });
        }

        fn get_staked_tokens_from_current_addr(self: @ContractState) -> u32 {
            self.staked_tokens.entry(get_caller_address()).read()
        }

        fn get_proposals_made_by_addr_through_name(self: @ContractState, name: felt252) -> u32 {
            self.proposals.entry(name).entry(get_caller_address()).read()
        }

        fn get_total_proposals_by_name(self: @ContractState, name: felt252) -> u32 {
            self.proposal_count.entry(name).read()
        }

        fn get_total_votes(self: @ContractState) -> u32 {
            self.all_votes.read()
        }
    }
}
