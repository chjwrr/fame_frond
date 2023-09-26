import {
  getWalletConnectConnector,
} from '@rainbow-me/rainbowkit';
import { getSteps, getWalletConnectUri } from '.';

import { InjectedConnector } from "wagmi/connectors/injected";
import {isCoin98} from './common';
import { isAndroid, isIOS } from '@/Common';
const svg ='/images/wallets/icon_wallet_coin98.png';


const Coin98Wallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2"
}:any) => {
  var _a, _b;
  const providers = typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.providers);
  const isCoin98Injected = typeof window !== "undefined" && typeof window.ethereum !== "undefined" && (((_b = window.ethereum.providers) == null ? void 0 : _b.some(isCoin98)) || window.ethereum.isCoin98);
  const shouldUseWalletConnect = !isCoin98Injected;
  return {
    id: "wallet-coin98",
    name: "Coin98",
    iconUrl: svg,
    iconBackground: '#0c2f78',
    downloadUrls: {
      android: 'https://coin98.com/',
      ios: 'https://coin98.com/',
      chrome: 'https://coin98.com/',
      qrCode: 'https://coin98.com/',
    },
    iconAccent: "#f6851a",
    installed: !shouldUseWalletConnect ? isCoin98Injected : void 0,
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId,
        chains,
        version: walletConnectVersion,
        options: walletConnectOptions
      }) : new InjectedConnector({
        chains,
        options: {
          getProvider: () => providers ? providers.find(isCoin98) : typeof window !== "undefined" ? window.ethereum : void 0,
          ...walletConnectOptions
        }
      });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isAndroid() ? uri : isIOS() ? `coin98://wc?uri=${encodeURIComponent(uri)}` : uri;
      };
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://coin98.com/",
            steps: getSteps('Coin98')
          }
        } : void 0,
        extension: {
          instructions: {
            learnMoreUrl: "https://coin98.com/",
            steps: getSteps('Coin98')
          }
        }
      };
    }
  };
};

export {
  Coin98Wallet
};

