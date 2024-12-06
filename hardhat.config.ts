import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/`,
      // 如果需要部署合约，请在这里添加账户私钥
      accounts: ['0x']
    },
  }
};

export default config;
