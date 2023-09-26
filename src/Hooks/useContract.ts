import { useAccount,useNetwork } from 'wagmi';
import { Contract, InterfaceAbi, JsonRpcProvider, ethers} from "ethers"
import {useEffect, useMemo, useState} from "react";

import {AddressMap} from '@/Contract/addresses';
import { ChainID } from '@/Contract/chains';
import { ERC20,ERC721, Fame, Getter } from '@/ABI/typechain';
import ERC20_ABI from "@/ABI/ERC20.json";
import ERC721_ABI from "@/ABI/ERC721.json";

import Fame_ABI from '@/ABI/fame.json'
import Getter_ABI from '@/ABI/getter.json'

export function useProvider(){
  const [provider,setProvider] = useState<any>(null)
  useEffect(()=>{
    let p = null
    if (global.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults")
      return
      p = ethers.getDefaultProvider(1)
  } else {
    p = new ethers.BrowserProvider(global.ethereum)
  }
  setProvider(p)
  },[])
  return provider
}
export function useSigner(){
  const provider = useProvider()
  const {address} = useAccount()
  const [signer,setSigner] = useState<any>()
  useEffect(()=>{
    async function getSigner(){
      const s = await provider.getSigner();
      setSigner(s)
    }
    if (provider){
      getSigner()
    }
  },[provider,address])
  return signer
}

export function getContract(address: string, abi: any,other?:any) {
  if (!address || !abi) {
      return null;
  }
  return new ethers.Contract(address, abi, other);
}

export function getTokenContract(address: string,provider:any) {
    return getContract(address, ERC20_ABI,provider);
}

export function getNFTContract(address: string,provider:any) {
  return getContract(address, ERC721_ABI,provider);
}

export function useContract(address: string, ABI: any, withSignerIfPossible = true): Contract | null {
  const {address:account} = useAccount()
  const provider = useProvider()
  const signer = useSigner()
  return useMemo(() => {
      if (!address || !ABI) return null
      try {
          return getContract(address, ABI, withSignerIfPossible ? signer : provider)
      } catch (error) {
          console.error('Failed to useContract', error)
          return null
      }
  }, [address, ABI, withSignerIfPossible, account])
}

export function useTokenContract<TContract extends Contract>(tokenAddress: AddressMap){
  const [contract,setContract] = useState<TContract | null>(null)
  const provider = useProvider();
  const signer = useSigner();
  const { chain } = useNetwork();

  useEffect(()=>{
    function getContract(){
      const address = tokenAddress[chain?.id as keyof typeof tokenAddress];
      if (!address) setContract(null)
      const tract = getTokenContract(address,signer) as TContract
      setContract(tract)
    }
    // console.log('provider==',provider,signer)
    if (provider && signer && chain?.id){
      getContract()
    }

  },[tokenAddress, chain?.id, signer, provider])
  return contract
}
export function useNFTContract<TContract extends Contract>(tokenAddress: AddressMap){
  const [contract,setContract] = useState<TContract | null>(null)
  const provider = useProvider();
  const signer = useSigner();
  const { chain = { id: 1 } } = useNetwork();

  useEffect(()=>{
    function getContract(){
      const address = tokenAddress[chain.id as keyof typeof tokenAddress];
      if (!address) setContract(null)
      const tract = getNFTContract(address,signer) as TContract
      setContract(tract)
    }
    if (provider && signer){
      getContract()
    }

  },[tokenAddress, chain.id, signer, provider])
  return contract
}
export const useStaticContract = <TContract extends Contract = Contract>(ABI:InterfaceAbi,addressMap: AddressMap,networkId:ChainID,rpc:string) => {
  const [contract,setContract] = useState<TContract | null>(null)
  const provider = new JsonRpcProvider(rpc)
  useEffect(()=>{
    function getContract(){
      const address = addressMap[networkId as keyof typeof addressMap];
      if (!address){
        setContract(null)
        return
      }
      const tract = new Contract(address, ABI, provider) as TContract
      setContract(tract)
    }
    if (provider){
      getContract()
    }

  },[addressMap, rpc, networkId, provider])
  return contract
};

export function useDynamicContract<TContract extends any>(addressMap: AddressMap, ABI:InterfaceAbi, asSigner = true){
  const [contract,setContract] = useState<TContract | null>(null)
  const provider = useProvider();
  const signer = useSigner();
  const { chain = { id: 1 } } = useNetwork();

  useEffect(()=>{
    function getContract(){
      const address = addressMap[chain.id as keyof typeof addressMap];
      if (!address) {
        setContract(null)
        return
      }
      const providerOrSigner = asSigner && signer ? signer : provider;
      const tract = new Contract(address, ABI, providerOrSigner) as TContract;
      setContract(tract)
    }
    if (provider && signer){
      getContract()
    }

  },[addressMap, chain.id, asSigner, signer, provider])
  return contract
}

export const createDynamicContract = <TContract extends any>(ABI: InterfaceAbi) => {
    return (addressMap: AddressMap, asSigner = true) => {
      const provider = useProvider();
      const signer = useSigner();
      const { chain = { id: 1 } } = useNetwork();
      return useMemo(() => {
        const address = addressMap[chain.id as keyof typeof addressMap];

        if (!address || !signer) return null;
        const providerOrSigner = asSigner && signer ? signer : provider;

        return new Contract(address, ABI, providerOrSigner) as TContract;
      }, [addressMap, chain.id, asSigner, signer, provider]);
    };
};

export const useDynamicTokenContract = createDynamicContract<ERC20>(ERC20_ABI);
export const useDynamic721Contract = createDynamicContract<ERC721>(ERC721_ABI);


export const useFameContract = createDynamicContract<Fame>(Fame_ABI);
export const useGetterContract = createDynamicContract<Getter>(Getter_ABI);
