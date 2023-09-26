import {
  getWalletConnectConnector,
} from '@rainbow-me/rainbowkit';
import { getSteps, getWalletConnectUri } from '.';

import { InjectedConnector } from "wagmi/connectors/injected";
import {isBitKeep} from './common';
import { isAndroid, isIOS } from '@/Common';
const svg ='/images/wallets/icon_wallet_bitkeep.png'


var BitKeepWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2"
}:any) => {
  var _a, _b;
  const providers = typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.providers);
  const isBitKeepInjected = typeof window !== "undefined" && typeof window.ethereum !== "undefined" && (((_b = window.ethereum.providers) == null ? void 0 : _b.some(isBitKeep)) || window.ethereum.isBitKeep);
  const shouldUseWalletConnect = !isBitKeepInjected;
  return {
    id: 'wallet-bitkeep',
    name: 'BitKeep Wallet',
    iconUrl: svg,
    iconBackground: "#000",
    downloadUrls: {
      android: 'https://bitkeep.com/',
      ios: 'https://bitkeep.com/',
      chrome: 'https://bitkeep.com/',
      qrCode: 'https://bitkeep.com/',
    },
    iconAccent: "#f6851a",
    installed: !shouldUseWalletConnect ? isBitKeepInjected : void 0,
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId,
        chains,
        version: walletConnectVersion,
        options: walletConnectOptions
      }) : new InjectedConnector({
        chains,
        options: {
          getProvider: () => providers ? providers.find(isBitKeep) : typeof window !== "undefined" ? window.ethereum : void 0,
          ...walletConnectOptions
        }
      });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isAndroid() ? uri : isIOS() ? `bitkeep://wc?uri=${encodeURIComponent(uri)}` : uri;
      };
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://bitkeep.com/",
            steps: getSteps('BitKeep')
          }
        } : void 0,
        extension: {
          instructions: {
            learnMoreUrl: "https://bitkeep.com/",
            steps: getSteps('BitKeep')
          }
        }
      };
    }
  };
};

export {
  BitKeepWallet
};

