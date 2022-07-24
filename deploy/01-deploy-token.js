const { deployments, getNamedAccounts, network, ethers } = require("hardhat");
const {
  INITIAL_SUPPLY,
  developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../helper-functions");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const args = [INITIAL_SUPPLY];
  log(`Deploying ERC20 contract to ${network.name}...`);
  const tokenContract = await deploy("OurToken", {
    from: deployer,
    log: true,
    args: args,
    waitConfirmations: 1,
  });
  // Verify the deployment
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(tokenContract.address, args);
  }
};
