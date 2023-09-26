

export enum ChainID {
  MAINNET = 1,
  TESTNET_RINKEBY = 4,
  ARBITRUM = 42161,
  ARBITRUM_TESTNET = 421611,
  AVALANCHE = 43114,
  AVALANCHE_TESTNET = 43113,
  POLYGON = 137,
  POLYGON_TESTNET = 80001,
  FANTOM = 250,
  FANTOM_TESTNET = 4002,
  OPTIMISM = 10,
  OPTIMISM_TESTNET = 69,
  BOBA = 288,
  BOBA_TESTNET = 28,
  ESC = 20,
  HECO = 128,
  BSC = 56,
  MATCH = 9001,
  BSC_TESTNET=97,
  ArbitrumGoerli= 421613
}

interface NetworkFace {
  [cid:number]:string
}

const ETHERSCAN_PREFIXES:NetworkFace = {
  [ChainID.HECO]: 'hecoinfo.com',
  [ChainID.ESC]: 'etherscan.io',
  [ChainID.BSC]: 'bscscan.com',
  [ChainID.MAINNET]: 'etherscan.io',
  [ChainID.POLYGON]: 'polygonscan.com',
  [ChainID.ArbitrumGoerli]: 'goerli.arbiscan.io',
  [ChainID.ARBITRUM]: 'arbiscan.io',

}

export function getScanLink(
    chainId: ChainID,
    data: string,
    type: 'transaction' | 'token' | 'block' | 'address'
): string {
  const prefix = `https://${ETHERSCAN_PREFIXES[chainId]}`

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'block': {
      return `${prefix}/block/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

const SCAN_NAMES:NetworkFace = {
  [ChainID.HECO]: 'HecoScan',
  [ChainID.ESC]: 'Etherscan',
  [ChainID.BSC]: 'BscScan',
  [ChainID.MAINNET]: 'LocalScan',
  [ChainID.POLYGON]: 'PolygonScan',
  [ChainID.ArbitrumGoerli]: 'ArbitrumGoerliScan',
  [ChainID.ARBITRUM]: 'ArbitrumScan',
}

export function getScanName(chainId: ChainID): string {
  return SCAN_NAMES[chainId]
}


export const BSC_Chain: any = {
  id: 56,
  name: 'BSC',
  network: 'BSC',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'BSC',
    symbol: 'BSC',
  },
  rpcUrls: {
    default: {
      http: ['https://bsc-dataseed1.defibit.io'],
    },
    public:{
      http: ['https://bsc-dataseed1.defibit.io'],
    }
  },
  blockExplorers: {
    default: { name: 'bscscan', url: 'https://bscscan.com/' },
    etherscan: { name: 'bscscan', url: 'https://bscscan.com/' },
  },
  testnet: false,
};

export const ArbitrumGoerli_Chain: any = {
  id: 421613,
  name: 'Arbitrum Goerli',
  network: 'Arbitrum Goerli',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://goerli-rollup.arbitrum.io/rpc'],
    },
    public:{
      http: ['https://goerli-rollup.arbitrum.io/rpc'],
    }
  },
  blockExplorers: {
    default: { name: 'arbiscan', url: 'https://goerli.arbiscan.io/' },
    etherscan: { name: 'arbiscan', url: 'https://goerli.arbiscan.io/' },
  },
  testnet: true,
};