create-oz-account: 
	sncast account create --network=sepolia --name=vote_sepolia

deploy-account:
	sncast account deploy --network sepolia --name vote_sepolia

declare-contract:
	sncast --account=vote_sepolia declare --contract-name=VoteStarknet --network=sepolia

deploy-contract:
	sncast --account=vote_sepolia deploy --class-hash=${CLASS_HASH} --network=sepolia
