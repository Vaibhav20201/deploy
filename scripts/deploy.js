// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { ethers } = hre

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Contract = await ethers.getContractFactory("DefaultReserveInterestRateStrategy");
  const contract = await Contract.deploy(
      '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5',
      '700000000000000000000000000',
      '0',
      '30000000000000000000000000',
      '1000000000000000000000000000',
      '40000000000000000000000000',
      '1000000000000000000000000000'
  );
  await contract.deployed();
  console.log("contract deployed to: ", contract.address)

  try {
    await hre.run('verify:verify', {
        address: contract.address,
        constructorArguments: [
            '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5',
            '700000000000000000000000000',
            '0',
            '30000000000000000000000000',
            '1000000000000000000000000000',
            '40000000000000000000000000',
            '1000000000000000000000000000'
        ],
        contract: "DefaultReserveInterestRateStrategy"
    })
  } catch (error) {
      console.log('Failed to verify Contract');
      console.log(error);
      console.log();
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
