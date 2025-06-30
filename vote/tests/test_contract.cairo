use snforge_std::{
    ContractClassTrait, DeclareResultTrait, EventSpyAssertionsTrait, declare, spy_events,
};
use vote::{
    IVotingStarknetV4Dispatcher, IVotingStarknetV4DispatcherTrait, IVotingStarknetV4SafeDispatcher,
    VotingStarknetV4,
};

fn deploy_contract(
    init_value: u32, proposals: u32,
) -> (IVotingStarknetV4Dispatcher, IVotingStarknetV4SafeDispatcher) {
    let contract = declare("VotingStarknetV4").unwrap().contract_class();

    let mut calldata = array![];

    init_value.serialize(ref calldata);
    proposals.serialize(ref calldata);

    let (contract_address, _) = contract.deploy(@calldata).unwrap();

    let dispatcher = IVotingStarknetV4Dispatcher { contract_address };
    let safe_dispatcher = IVotingStarknetV4SafeDispatcher { contract_address };

    (dispatcher, safe_dispatcher)
}

#[test]
fn test_tokens_available() {
    let initial_tokens = 3000000;
    let proposals = 0;

    let (dispatcher, _) = deploy_contract(initial_tokens, proposals);
    let tokens = dispatcher.get_tokens();

    assert!(tokens == initial_tokens, "It is not initializing...")
}

#[test]
fn test_get_stake_tokens() {
    let tokens = 3000000;
    let proposals = 0;

    let (dispatcher, _) = deploy_contract(tokens, proposals);
    let mut spy = spy_events();

    dispatcher.stake_tokens();

    let expected_tokens = tokens - 15;
    let current_tokens = dispatcher.get_tokens();
    let expected_staked_tokens = 15;
    let current_staked_tokens = dispatcher.get_staked_tokens_from_current_addr();

    spy
        .assert_emitted(
            @array![
                (
                    dispatcher.contract_address,
                    VotingStarknetV4::Event::TokenDecrease(
                        VotingStarknetV4::TokenDecrease { tokens: current_tokens },
                    ),
                ),
                (
                    dispatcher.contract_address,
                    VotingStarknetV4::Event::StakedTokensIncrease(
                        VotingStarknetV4::StakedTokensIncrease { tokens: current_staked_tokens },
                    ),
                ),
            ],
        );

    assert!(current_tokens == expected_tokens, "Tokens should decrease after stake");
    assert!(current_staked_tokens == expected_staked_tokens, "Staked tokens should be received");
}

#[test]
fn test_stake_tokens_decreases_after_a_vote() {
    let tokens = 3000000;
    let proposals = 0;

    let (dispatcher, _) = deploy_contract(tokens, proposals);
    let mut spy = spy_events();

    dispatcher.stake_tokens();

    dispatcher.vote_on_proposals('Genesis');

    let expected_tokens = 14;
    let current_tokens = dispatcher.get_staked_tokens_from_current_addr();
    spy
        .assert_emitted(
            @array![
                (
                    dispatcher.contract_address,
                    VotingStarknetV4::Event::StakedTokensDecrease(
                        VotingStarknetV4::StakedTokensDecrease { tokens: current_tokens },
                    ),
                ),
            ],
        );

    assert!(current_tokens == expected_tokens, "Tokens should be decreased with every vote")
}


#[test]
fn test_voting_on_a_proposal() {
    let tokens = 3000000;
    let proposals = 0;

    let (dispatcher, _) = deploy_contract(tokens, proposals);
    let mut spy = spy_events();

    dispatcher.stake_tokens();

    dispatcher.vote_on_proposals('Genesis');

    let expected_votes = 1;
    let current_votes = dispatcher.get_total_votes();
    let current_proposal_count = dispatcher.get_total_proposals_by_name('Genesis');
    let expected_proposal_count = 1;

    spy
        .assert_emitted(
            @array![
                (
                    dispatcher.contract_address,
                    VotingStarknetV4::Event::AllVotesIncrease(
                        VotingStarknetV4::AllVotesIncrease { all_votes: current_votes },
                    ),
                ),
                (
                    dispatcher.contract_address,
                    VotingStarknetV4::Event::AllProposalIncrease(
                        VotingStarknetV4::AllProposalIncrease { all_proposals: current_votes },
                    ),
                ),
            ],
        );

    assert!(
        current_proposal_count == expected_proposal_count,
        "Proposals should increase with every vote made",
    );
    assert!(current_votes == expected_votes, "Votes should increase with every vote made");
}

