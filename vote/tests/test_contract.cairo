use snforge_std::{ContractClassTrait, DeclareResultTrait, declare};
use vote::{
    IVotingStarknetV3Dispatcher, IVotingStarknetV3DispatcherTrait, IVotingStarknetV3SafeDispatcher,
};

fn deploy_contract(
    init_value: u128, proposals: usize,
) -> (IVotingStarknetV3Dispatcher, IVotingStarknetV3SafeDispatcher) {
    let contract = declare("VotingStarknetV3").unwrap().contract_class();

    let mut calldata = array![];

    init_value.serialize(ref calldata);
    proposals.serialize(ref calldata);

    let (contract_address, _) = contract.deploy(@calldata).unwrap();

    let dispatcher = IVotingStarknetV3Dispatcher { contract_address };
    let safe_dispatcher = IVotingStarknetV3SafeDispatcher { contract_address };

    (dispatcher, safe_dispatcher)
}

fn initialize() -> IVotingStarknetV3Dispatcher {
    let init_value: u128 = 0;
    let proposals: usize = 0;

    let (dispatcher, _) = deploy_contract(init_value, proposals);

    dispatcher
}

#[test]
fn test_create_proposal() {
    let dispatcher = initialize();
    let balance = dispatcher.get_staked_tokens_from_current_addr();

    if (balance == 0) {
        dispatcher.stake_tokens();
    }

    dispatcher.create_a_proposal('Genesis');
}

#[test]
fn test_vote_on_proposal() {
    let dispatcher = initialize();

    dispatcher.vote_on_proposals('Genesis');
}
