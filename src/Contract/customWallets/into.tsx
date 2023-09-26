import {
    Chain,
    Wallet,
    getWalletConnectConnector,
} from '@rainbow-me/rainbowkit';
import {MetaMaskConnector} from "wagmi/connectors/metaMask";
export interface MyWalletOptions {
    projectId: string;
    chains: Chain[];
}
export const IntoWallet = ({
                            chains,
                            projectId,
                        }: MyWalletOptions): Wallet => ({
    id: 'wallet-into',
    name: 'Into Wallet',
    iconUrl: '/images/wallets/icon_wallet_into.png',
    iconBackground: '#0c2f78',
    downloadUrls: {
        android: 'https://intoverse.co/',
        ios: 'https://intoverse.co/',
        chrome: 'https://intoverse.co/',
        qrCode: 'https://intoverse.co/',
    },
    createConnector: () => {
        const connector = getWalletConnectConnector({ chains, projectId });
        return {
            connector,
            mobile: {
                getUri:  async () => {
                    //@ts-ignore
                    const { uri } = (await connector.getProvider()).signer;
                    return uri || "";
                },
            },
            qrCode: {

                getUri:  async () => {
                    //@ts-ignore
                    const { uri } = (await connector.getProvider()).signer;
                    return uri || "";
                },
                instructions: {
                    learnMoreUrl: 'https://my-wallet/learn-more',
                    steps: [
                        {
                            description:
                                'We recommend putting Bitkeep Wallet on your home screen for faster access to your wallet.',
                            step: 'install',
                            title: 'Open the Bitkeep Wallet app',
                        },
                        {
                            description:
                                'After you scan, a connection prompt will appear for you to connect your wallet.',
                            step: 'scan',
                            title: 'Tap the scan button',
                        },
                    ],
                },
            },
            extension: {
                instructions: {
                    learnMoreUrl: 'https://my-wallet/learn-more',
                    steps: [
                        {
                            description:
                                'We recommend pinning Into Wallet to your taskbar for quicker access to your wallet.',
                            step: 'install',
                            title: 'Install the Into Wallet extension',
                        },
                        {
                            description:
                                'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
                            step: 'create',
                            title: 'Create or Import a Wallet',
                        },
                        {
                            description:
                                'Once you set up your wallet, click below to refresh the browser and load up the extension.',
                            step: 'refresh',
                            title: 'Refresh your browser',
                        },
                    ],
                },
            },
        };
    },
});
