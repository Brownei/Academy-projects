export const ABI = [
  {
    "name": "VotingStarknetV4Impl",
    "type": "impl",
    "interface_name": "vote::IVotingStarknetV4"
  },
  {
    "name": "vote::IVotingStarknetV4",
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
            "type": "core::integer::u32"
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
        "name": "get_tokens",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u32"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_proposals_made_by_addr_through_name",
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
        "type": "core::integer::u32"
      },
      {
        "name": "proposals",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "vote::VotingStarknetV4::TokenIncrease",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "tokens",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "vote::VotingStarknetV4::TokenDecrease",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "tokens",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "vote::VotingStarknetV4::StakedTokensIncrease",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "tokens",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "vote::VotingStarknetV4::StakedTokensDecrease",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "tokens",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "vote::VotingStarknetV4::AllVotesIncrease",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "all_votes",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "vote::VotingStarknetV4::AllProposalIncrease",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "all_proposals",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "vote::VotingStarknetV4::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "TokenIncrease",
        "type": "vote::VotingStarknetV4::TokenIncrease"
      },
      {
        "kind": "nested",
        "name": "TokenDecrease",
        "type": "vote::VotingStarknetV4::TokenDecrease"
      },
      {
        "kind": "nested",
        "name": "StakedTokensIncrease",
        "type": "vote::VotingStarknetV4::StakedTokensIncrease"
      },
      {
        "kind": "nested",
        "name": "StakedTokensDecrease",
        "type": "vote::VotingStarknetV4::StakedTokensDecrease"
      },
      {
        "kind": "nested",
        "name": "AllVotesIncrease",
        "type": "vote::VotingStarknetV4::AllVotesIncrease"
      },
      {
        "kind": "nested",
        "name": "AllProposalIncrease",
        "type": "vote::VotingStarknetV4::AllProposalIncrease"
      }
    ]
  }
] as const
