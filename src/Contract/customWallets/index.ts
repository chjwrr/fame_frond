export async function getWalletConnectUri(connector:any, version:string) {
  const provider = await connector.getProvider();
  return version === "2" ? new Promise((resolve) => provider.once("display_uri", resolve)) : provider.connector.uri;
}

type StepName = 'install' | 'create' | 'scan' | 'refresh';
export function getSteps(name:string){
  const steps: {
    step: StepName;
    title: string;
    description: string;
  }[] = [
    {
      description: `Add ${name} to your home screen for faster access to your wallet.`,
      step: 'install',
      title: `Open the ${name} app`
    },
    {
      description: "Create a new wallet or import an existing one.",
      step: 'create',
      title: "Create or Import a Wallet"
    },
    {
      description: "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect.",
      step: 'scan',
      title: "Tap the QR icon and scan"
    },
    {
      description: "Once you set up your wallet, click below to refresh the browser and load up the extension.",
      step: "refresh",
      title: "Refresh your browser"
    }
  ]
  return steps
}
