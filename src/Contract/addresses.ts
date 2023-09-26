import { ChainID } from './chains';

export interface AddressMap {
  [cid:number]:`0x${string}` | string
}

export const USDT_ADDRESSSES:AddressMap = {
  [ChainID.BSC]: "0x55d398326f99059fF775485246999027B3197955",
};

// export const ETH_ADDRESSSES:AddressMap = {
//   [ChainID.ArbitrumGoerli]: "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
// };

export const Fame_ADDRESSSES:AddressMap = {
  [ChainID.ArbitrumGoerli]: "0xcB76f5DC8a79BfF3F4821fc6120A915D089C0842",
};
export const Getter_ADDRESSSES:AddressMap = {
  [ChainID.ArbitrumGoerli]: "0x338D89F98114d8d11186C8Db2e75BdB4c5ea8D4F",
};
