list-accounts:
	sncast account list

create-account: 
	sncast account create --network=sepolia --name=vote_sepolia

deploy-account:
	sncast account deploy --network sepolia --name vote_sepolia

declare-contract:
	sncast --account=vote_sepolia declare --contract-name=VotingStarknetV4 --network=sepolia

deploy-contract:
	sncast --account=vote_sepolia deploy --class-hash=${CLASS_HASH} --constructor-calldata 3000000 0 --network=sepolia 
