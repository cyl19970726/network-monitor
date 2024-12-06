import { ethers } from "ethers";

// 定义 ABI 接口类型
interface IToken {
  balanceOf(who: string, options?: { blockTag?: number }): Promise<bigint>;
}

// ERC20的ABI
const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [{"name": "who", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
] as const;

async function main(): Promise<void> {
  // 合约常量
  const TOKENS = {
    USDT: {
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      decimals: 6
    },
    USDC: {
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      decimals: 6
    },
    DAI: {
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      decimals: 18
    }
  };
  const TARGET_ADDRESS: string = "0x5758DB92Ec1C726cc36547A73DdF622D44190119";
  const BLOCK_NUMBER = 20641882;

  try {
    const provider = new ethers.JsonRpcProvider(
      `https://mainnet.infura.io/v3/63aa34e959614d01a9a65d3f93b70e66`
    );

    for (const [symbol, token] of Object.entries(TOKENS)) {
      const contract = new ethers.Contract(
        token.address,
        ERC20_ABI,
        provider
      ) as unknown as IToken;

      const balance = await contract.balanceOf(TARGET_ADDRESS, {
        blockTag: BLOCK_NUMBER
      });
      
      const formattedBalance = ethers.formatUnits(balance, token.decimals);
      console.log(`地址 ${TARGET_ADDRESS} 在区块 ${BLOCK_NUMBER} 的${symbol}余额是: ${formattedBalance} ${symbol}`);
    }
  } catch (error) {
    console.error("查询出错:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  }); 