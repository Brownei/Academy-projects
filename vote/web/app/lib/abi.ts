export const ABI = [
  {
    "name": "VotingStarknetV3Impl",
    "type": "impl",
    "interface_name": "vote::IVotingStarknetV3"
  },
  {
    "name": "vote::IVotingStarknetV3",
    "type": "interface",
    "items": [
      {
        "name": "create_a_proposal",
        "type": "function",
        "inputs": [
          {
            "name": "name",
            "type": "core::felt252"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "stake_tokens",
        "type": "function",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "vote_on_proposals",
        "type": "function",
        "inputs": [
          {
            "name": "name",
            "type": "core::felt252"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_staked_tokens_from_current_addr",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_total_proposals_by_name",
        "type": "function",
        "inputs": [
          {
            "name": "name",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u32"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_total_votes",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u32"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "name": "constructor",
    "type": "constructor",
    "inputs": [
      {
        "name": "init_value",
        "type": "core::integer::u128"
      },
      {
        "name": "proposals",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "vote::VotingStarknetV3::Event",
    "type": "event",
    "variants": []
  }
] as const
