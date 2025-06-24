use snforge_std::{ContractClassTrait, DeclareResultTrait, declare};
use starknet::ContractAddress;
use vote::{
    IVoteStarknetDispatcher, IVoteStarknetDispatcherTrait, IVoteStarknetSafeDispatcher,
    IVoteStarknetSafeDispatcherTrait,
};

fn deploy_contract(name: ByteArray) -> ContractAddress {
    let contract = declare(name).unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@ArrayTrait::new()).unwrap();
    contract_address
}

#[test]
fn test_create_proposal() {
    let contract_address = deploy_contract("VoteStarknet");

    let dispatcher = IVoteStarknetDispatcher { contract_address };

    let balance_before = dispatcher.get_balance();
    assert(balance_before == 0, 'Invalid balance');

    dispatcher.create_a_proposal('', 0);

    let balance_after = dispatcher.get_balance();
    assert(balance_after == 42, 'Invalid balance');
}

#[test]
#[feature("safe_dispatcher")]
fn test_cannot_vote_for_a_proposal_with_zero_value() {
    let contract_address = deploy_contract("VoteStarknet");

    let safe_dispatcher = IVoteStarknetSafeDispatcher { contract_address };

    let balance_before = safe_dispatcher.get_balance().unwrap();
    assert(balance_before == 0, 'Invalid balance');

    match safe_dispatcher.stake_tokens(0) {
        Result::Ok(_) => core::panic_with_felt252('Should have panicked'),
        Result::Err(panic_data) => {
            assert(*panic_data.at(0) == 'Amount cannot be 0', *panic_data.at(0));
        },
    };
}
