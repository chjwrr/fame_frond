import {
  getWalletConnectConnector,
} from '@rainbow-me/rainbowkit';
import { getSteps, getWalletConnectUri } from '.';
import { isAndroid, isIOS } from '@/Common';
import { InjectedConnector } from "wagmi/connectors/injected";
import { isTokenPocket } from './common';
const TokenpocketSVG ='/tokens/tokenpocket.svg';


var TokenPocketWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2"
}:any) => {
  var _a, _b;
  const providers = typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.providers);
  const isTokenPocketInjected = typeof window !== "undefined" && typeof window.ethereum !== "undefined" && (((_b = window.ethereum.providers) == null ? void 0 : _b.some(isTokenPocket)) || window.ethereum.isTokenPocket);
  const shouldUseWalletConnect = !isTokenPocketInjected;
  return {
    id: "tpwallet",
    name: "TokenPocket",
    iconUrl: TokenpocketSVG,
    iconBackground: "#000",
    downloadUrls: {
      android: "https://www.tokenpocket.pro/zh/download/app",
      ios: "https://www.tokenpocket.pro/zh/download/app",
      mobile: "https://www.tokenpocket.pro/zh/download/app",
      qrCode: "https://www.tokenpocket.pro/zh/download/app"
    },
    iconAccent: "#f6851a",
    installed: !shouldUseWalletConnect ? isTokenPocketInjected : void 0,
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId,
        chains,
        version: walletConnectVersion,
        options: walletConnectOptions
      }) : new InjectedConnector({
        chains,
        options: {
          getProvider: () => providers ? providers.find(isTokenPocket) : typeof window !== "undefined" ? window.ethereum : void 0,
          ...walletConnectOptions
        }
      });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isAndroid() ? uri : isIOS() ? `tpoutside://wc?uri=${encodeURIComponent(uri)}` : uri;
      };
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://www.tokenpocket.pro",
            steps: getSteps('TokenPocket')
          }
        } : void 0,
        extension: {
          instructions: {
            learnMoreUrl: "https://www.tokenpocket.pro",
            steps: getSteps('TokenPocket')
          }
        }
      };
    }
  };
};

export {
  TokenPocketWallet
};

