import { GasInfo, formatBalance, formatNumber } from '@/Common';
import { BigNumberish, Contract, MaxUint256, TransactionResponse, ethers, formatUnits, parseUnits } from 'ethers';
import { useTokenAllowance, useApprove } from '@/Hooks/useTokenContract';
import { useMutation, useQuery } from 'react-query';
import { Getter_ADDRESSSES, USDT_ADDRESSSES } from '@/Contract/addresses';
import { getContract, readContract } from '@wagmi/core'
import { ApprovalState, config } from '@/Common';
import { Address, useAccount, useNetwork, useContractWrite } from 'wagmi';
import { AddressMap } from './addresses';
import ERC20_ABI from '@/ABI/ERC20.json'
import { useLoadingContext, LoadingType } from '@/Provider/loadingProvider';
import dayjs from 'dayjs';
import { postRequest, getRequest } from '@/API';
import {
  API_SEARCH_TWITTER, API_USER_INFO,
} from '@/API/API';
import { useDynamicContract, useGetterContract, useProvider, useTokenContract } from '@/Hooks/useContract';
import BigNumber from 'bignumber.js'
import { reduxStore } from '@/Redux';
import { useDispatch } from 'react-redux';
import { saveCurrentInfo, useAuthorization, useCurrentUserInfo } from '@/Redux/setting';
import { useWeb3Modal } from '@web3modal/react';

interface Transaction {
  title: string,
  functionName:string,
  args: any[],
  // cost?:string | number,
  gasLimit?: boolean,
  onSuccess?: Function,
  onError?: Function,
}
export function useSendTransaction({
  contractAddress,
  abi,
}:{
  contractAddress:AddressMap,
  abi:any,
}) {
  const {open} = useWeb3Modal()
  const loading = useLoadingContext()
  const {chain = { id : 56 }} = useNetwork()
  const {address} = useAccount()
  const contract = useDynamicContract(contractAddress,abi) as any
  // const tokenContract = useTokenContract(tokenAddress)
  function sendTransaction(params: Transaction) {
    // if (!params.cost){
      return new Promise(async() => {
        if (!address){
          loading.show(LoadingType.error, 'Please connect wallet')
          open && open()
          return
        }
        send(params,params.functionName)
      })
    // }
    // loading.show(LoadingType.pending, 'Querying authorization information...')
    // return new Promise(async() => {
    //   if (!address){
    //     loading.show(LoadingType.error, 'Please connect wallet')
    //     openConnectModal && openConnectModal()
    //     return
    //   }
      // if (tokenContract){
        // try {
          // const allowance:bigint = await tokenContract.allowance(address, contractAddress[chain.id as keyof AddressMap]);
          // if (Number(formatUnits(allowance)) == 0 || Number(formatUnits(allowance)) < Number(params.cost)){
          //   loading.show(LoadingType.pending, 'Authorizing...')
          //   tokenContract.approve(contractAddress[chain.id as keyof AddressMap], MaxUint256)
          //     .then(async (response: TransactionResponse) => {
          //         loading.show(LoadingType.pending, response.hash)
          //         await response.wait();
          //         send(params,params.functionName)
          //     })
          //     .catch((err: any) => {
          //       console.log('approve error===',err)
          //         loading.show(LoadingType.error, err.data?.message || err.message)
          //     })
          // }else {
            // send(params,params.functionName)
          // }
        // } catch (error:any) {
        //   console.log('allowance error===',error)

        // }
      // }
    // })

    async function send(params:Transaction,functionName:string){
      if (!contract){
        loading.show(LoadingType.error,'create dynamic Contract error')
        return
      }
      loading.show(LoadingType.confirm, params.title)
      contract[functionName](...params.args,params.gasLimit == false ? {} : {gasLimit:1500000})
      .then(async (response: TransactionResponse) => {
        loading.show(LoadingType.pending, response.hash)
        const result:any = await response.wait();
        console.log('result===',result)
        if (result.status == 1){
          loading.show(LoadingType.success, response.hash)
          params.onSuccess && params.onSuccess()
        }else {
          loading.show(LoadingType.error,'Please check the error message in the blockchain explorer')
          params.onError && params.onError()
        }
      })
      .catch((err: any) => {
        console.log(functionName,err)
        loading.show(LoadingType.error,err.reason || err.message ,err.transactionHash)
        params.onError && params.onError()
      })
    }
  }

  return useMutation((params: Transaction) => sendTransaction(params))
}



interface TransactionOld {
  title: string,
  func: Function,
  args: any[],
  gasLimit?: boolean,
  onSuccess?: Function,
  onError?: Function,
  valueInfo?:any
}

export function useSendTransactionOld() {
  const loading = useLoadingContext()

  function sendTransaction(params: TransactionOld) {
      return new Promise(() => {
          loading.show(LoadingType.confirm, params.title)
          params.func(...params.args, params.valueInfo ? params.valueInfo : {})
              .then(async (response: TransactionResponse) => {
                  loading.show(LoadingType.pending, response.hash)
                  await response.wait();
                  loading.show(LoadingType.success, response.hash)
                  params.onSuccess && params.onSuccess()
              })
              .catch((err: any) => {
                  console.log('useSendTransactionOld=',err)
                  loading.show(LoadingType.error, err.reason || err.message, err.transactionHash)
                  params.onError && params.onError()
              })
      })
  }

  return useMutation((params: TransactionOld) => sendTransaction(params))
}


// export function useIsMint(){
//   const {address} = useAccount()
//   const {chain = { id : 56 }} = useNetwork()
//   // const mintContranct = getContract({
//   //   address:IntoSocialMining_ADDRESSSES[chain.id as keyof AddressMap] as Address,
//   //   abi:IntoSocialMining_ABI,
//   // })


//   const mintContranct = useDynamicContract<IntoSocialMining>(IntoSocialMining_ADDRESSSES,IntoSocialMining_ABI)

//   async function fetchData(){
//     if (!address || !mintContranct){
//       return
//     }

//     const lastDay = dayjs().format('YYYYMMDD')

//     // nftContranct.estimateGas.price([1])
//     const isMining:boolean = await mintContranct.isMining(lastDay,address)
//     console.log('isMining===',isMining)
//     return {
//       isMining
//     }
//   }
//   return useQuery(["useIsMint"], fetchData, {
//     enabled:!!chain.id && !!address && !!mintContranct,
//     // refetchInterval: config.refreshInterval,
//   })

// }


export function useWalletBalance() {
  const {address} = useAccount()
  const {chain} = useNetwork()
  const networkId = chain?.id
  const provider = useProvider()


  const fetchData = async () => {
    if (!address || !networkId) {
        return;
    }
    if (!provider) {
        return
    }
    let callContextArr:any = []
    // walletTokens.forEach((item: any, index: number) => {
    //   const coinContract = new ethers.Contract(item.address[networkId], ERC20_ABI, provider);
    //   callContextArr.push(coinContract.balanceOf(address))
    // })
    // const multicallResult = await Promise.all(callContextArr)
    let data: any = {}
    // multicallResult.map((item:bigint,index:number)=>{
    //   data[walletTokens[index].name] = Number(formatUnits(item))
    //   data[walletTokens[index].name+'_decimals'] = 18
    // })
    data["ETH"] = Number(formatUnits(await provider.getBalance(address)))
    data["ETH_decimals"] = 18

    // console.log('lpBalance= get==')
    // const coinContractLP = new ethers.Contract('0x79c848F221Afa72A47DB2660f213aceA20E1cC32', ERC20_ABI, provider);
    // const lpBalance = await coinContractLP.balanceOf(address)

    return data
  }
  return useQuery(["useWalletBalance"],fetchData,{
    enabled:!!networkId && !!address  ,
    refetchInterval: config.refreshInterval,
  })
}

// type = 0  buy   type = 1  sell
export function useTradeInfo(subjectId:string,amount:string | number,type:number){
  const {address} = useAccount()
  const getterContract = useGetterContract(Getter_ADDRESSSES)
  async function fetchData(){
    try {
      if (!address || !getterContract){
        return
      }
      let buyAmt:string | number = 0
      let sellAmt:string | number = 0
      if (type == 0){
      buyAmt = amount
      sellAmt = 0
      }else {
      buyAmt = 0
      sellAmt = amount
      }
      
      console.log('subjectId===',subjectId ,'address=',address,'buyAmt=',buyAmt,'sellAmt=',sellAmt)
      const result:any = await getterContract?.getSubjectTradeUserInfo(subjectId,address,buyAmt,sellAmt)
      console.log('result===',result)

      const ethPrice = formatUnits(result[8],8)
      let price = ''
      let fee = ''
      let total = ''
      let priceAfterFee = 0
      const balance = formatUnits(result[7])
      const keyAmout = result[1].toString()
      if (type == 0){
      price = formatUnits(result[5][0])
      fee = formatUnits(result[5][2] - result[5][1])
      total = formatUnits(result[5][2])
      priceAfterFee = result[5][2]
    }else {
      price = formatUnits(result[6][0])
      fee = formatUnits(result[6][1] - result[6][2])
      total = formatUnits(result[6][2])
      priceAfterFee = result[6][2]
      }
      const feeUSDT = BigNumber(fee).times(BigNumber(ethPrice)).toString()
      const totalUSDT = BigNumber(total).times(BigNumber(ethPrice)).toString()
      return {
        price,
        fee,
        total,
        feeUSDT,
        totalUSDT,
        balance,
        priceAfterFee,
        keyAmout
      }
    }catch(e:any){
      console.log('useTradeInfo error=',e)
    }
  }
  return useQuery(["useTradeInfo" + amount + subjectId + Number(type)], fetchData, {
    enabled:!!getterContract && !!subjectId,
    refetchInterval: config.shortRefreshInterval,
  })
}
export function useUserInfo(){
  const {address} = useAccount()
  const {chain} = useNetwork()
  const dispatch = useDispatch()
  const authorizationInfo = useAuthorization()
  async function fetchData(){
    try {
      if (!address || !chain || !chain.id){
        return
      }
      console.log('authorizationInfo-=-=-=-=',authorizationInfo)
      if (!authorizationInfo || !authorizationInfo.authorization) return
      console.log('开始自动请求用户信息')
      const result:any = await postRequest(API_USER_INFO + '?chain_id=' + chain.id,{},{
        headers:{
          'authorization':authorizationInfo.authorization
        }
      })
      console.log('自动获取用户信息并存储==',result)

      dispatch(saveCurrentInfo(result))

      return {
        ...result
      }
    }catch(e:any){
      console.log('useUserInfo error=',e)
    }
  }
  return useQuery(["useUserInfo",address], fetchData, {
    enabled:!!address,
    refetchInterval: config.longRefreshInterval,
  })
}

export function usePersonalTopInfo(){
  const {address} = useAccount()
  const currentUserInfo = useCurrentUserInfo()
  const getterContract = useGetterContract(Getter_ADDRESSSES)
  async function fetchData(){
    try {
      if (!address || !getterContract || !currentUserInfo){
        return
      }
      let sid:any = []
      currentUserInfo.balances && currentUserInfo.balances.map((it:any)=>{
        sid.push(it.subject_id)
      })

      const result:any = await getterContract?.getUserProfolio(sid,address)
      console.log('result===',result)

      const Dividend = result[0][1] + result[0][2]
      const Referrals = result[0][0]
      const LoyaltyFee = result[0][3]

      return {
        Dividend:formatNumber(formatUnits(Dividend)),
        Referrals:formatNumber(formatUnits(Referrals)),
        LoyaltyFee:formatNumber(formatUnits(LoyaltyFee)),

        Dividend_old:formatUnits(Dividend),
        Referrals_old:formatUnits(Referrals),
        LoyaltyFee_old:formatUnits(LoyaltyFee),

      }
    }catch(e:any){
      console.log('usePersonalTopInfo error=',e)
    }
  }
  return useQuery(["usePersonalTopInfo" + address], fetchData, {
    enabled:!!getterContract && !!address && !!currentUserInfo.balances,
    refetchInterval: config.shortRefreshInterval,
  })
}



export function usePersonalKeysInfo(){
  const {address} = useAccount()
  const currentUserInfo = useCurrentUserInfo()
  const getterContract = useGetterContract(Getter_ADDRESSSES)
  async function fetchData(){
    try {
      if (!address || !getterContract || !currentUserInfo){
        return
      }
      let sid:any = []
      currentUserInfo.balances && currentUserInfo.balances.map((it:any)=>{
        sid.push(it.subject_id)
      })

      const result:any = await getterContract?.getSubjectsUserInfo(sid,address)
      console.log('请求用户的keys===',result)

      let keys:any = []
      currentUserInfo.balances && currentUserInfo.balances.map((it:any,index:number)=>{
        keys.push({
          profile_image_url:it.profile_image_url,
          name:it.name,
          screen_name:it.screen_name,
          follower_no:it.followers_count,
          balance:it.balance,
          subject_id:it.subject_id,
          price:result[index][0],
          supply:Number(result[index][2].toString()),
          tvl:result[index][3],
          mc:result[index][4],
          subjectIncome:result[index][5],
        })
      })
      console.log('keys====',keys)
      return {
        keys
      }
    }catch(e:any){
      console.log('usePersonalKeysInfo error=',e)
    }
  }
  return useQuery(["usePersonalKeysInfo" + address], fetchData, {
    enabled:!!getterContract && !!address && !!currentUserInfo.balances,
    refetchInterval: config.shortRefreshInterval,
  })
}



