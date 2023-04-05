// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @Autor AuDede
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Ballot {
    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        address delegate; // person delegated to
        uint vote;   // index of the voted proposal
    }

    struct Proposal {
        string name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }

    address public chairperson;

    mapping(address => Voter) public voters;

    address[] public votersList;

    Proposal[] public proposals;

    /**
     * @dev Create a new ballot to choose one of 'proposalNames'.
     */
    constructor() {
        string[2] memory proposalNames = ["Gregos", "Nissam"];
        votersList = new address[](20);
        chairperson = msg.sender;
        voters[chairperson].weight = 1;

        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
            name: proposalNames[i],
            voteCount: 0
            }));
        }
    }

    /**
     * @dev Give 'voter' the right to vote on this ballot. May only be called by 'chairperson'.
     * @param voter address of voter
     */
    function giveRightToVote(address voter) public {
        require(
            msg.sender == chairperson,
            "Only chairperson can give right to vote."
        );
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        //require(voters[voter].weight == 0);
        voters[voter].weight = 1;
        for (uint i = 0; i < votersList.length; i++) {
            if (votersList[i] == address(0)) {
                votersList[i]=voter;
                break;
            }
        }

    }

    /**
     * @dev Give your vote (including votes delegated to you) to proposal 'proposals[proposal].name'.
     * @param proposal index of proposal in the proposals array
     */
    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;

        // If 'proposal' is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        for (uint i = 0; i < votersList.length; i++) {
            if (votersList[i] == msg.sender) {
            votersList[i]=address(0);
            }
        }
        proposals[proposal].voteCount += sender.weight;
    }

     /**
     * @dev Get all proposals aactualy in list
     */
    function getAllProposals() external view returns(Proposal[] memory){
        Proposal[] memory items = new Proposal[](proposals.length);
        for(uint i = 0; i < proposals.length; i++) {
            items[i] = proposals[i];
        }
        return items;
    }
    
    /**
     * @dev return every address of voters how haven t vote
     */
    function getAllVoters() external view returns(address[] memory){
        return votersList;
    }
}
