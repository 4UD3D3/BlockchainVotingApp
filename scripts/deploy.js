const hre = require("hardhat");

async function main() {
  const Ballot = await hre.ethers.getContractFactory("Ballot");
  const ballotContractInstance = await Ballot.deploy();
  await ballotContractInstance.deployed();

  console.log("Ballot deployed to: ", ballotContractInstance.address);
  const voters = await hre.ethers.getSigners();
  for (const voter of voters) {     
    await ballotContractInstance.giveRightToVote(voter.address);
    console.log("A voting right given to: ", voter.address);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
