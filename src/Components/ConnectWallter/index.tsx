import React, {useCallback, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from 'wagmi'
import useTranslationLanguage from '@/Hooks/useTranslationLanguage';
import { FlexView, FlexViewCenter, FlexViewColumn, FlexViewBetween, FlexViewCenterColumn, FlexViewEnd } from '../View';
import { autoWidthVW, formatAccount } from '@/Common';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { ArbitrumGoerli_Chain } from '@/Contract/chains';
import { connect,disconnect } from '@wagmi/core'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { postEthRequestRequest, postRequest, axiosHeaders } from '@/API';
import { API_ETH_REQUEST, API_ETH_VERIFY } from '@/API/API';
import { saveAuthorization, saveCurrentInfo, useAuthorization } from '@/Redux/setting';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { message } from 'antd';
import { watchAccount } from '@wagmi/core'
import _ from 'lodash'
import { JsonRpcProvider, ethers} from "ethers"
import { useUserInfo } from '@/Contract';
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useNavigate, useSearchParams } from 'umi';
import { useWeb3Modal } from '@web3modal/react';
import { arbitrumGoerli } from 'viem/chains';


export default function ConnectWallet() {
  const {t} = useTranslationLanguage()
  const [show,setShow] = useState(false)
  const { address, isConnected } = useAccount()
  const {chain} = useNetwork()
  const [isLogin,setIsLogin] = useState(false)
  const naviagate = useNavigate()
  const [searchParams,setSearchparams] = useSearchParams()
  const referral_code = searchParams.get('referral_code')
  const authorizationInfo = useAuthorization()
  const dispatch = useDispatch()
  console.log('address===',address,isConnected,chain)
  const userInfo = useUserInfo()


  useEffect(()=>{
    if (address){
      if (!isLogin){
        setIsLogin(true)
      }
    }
  },[address])

  useEffect(()=>{
    watchAccount(
      (account:any) => {
        console.log('account===',account,dayjs().valueOf())
        if (account.address){
        }
      })
  },[])


  async function onMetamask(){
    const connectInfo = await connect({
      connector:new MetaMaskConnector({
        chains: [ArbitrumGoerli_Chain],
        options:{}
      })
    })
    console.log('链接钱包成功',connectInfo)
    localStorage.setItem('wagmi.injected.shimDisconnect', "1")
    setShow(false)
    onLogin(connectInfo.account)

  }

  async function onWalletconnect(){
    const connectInfo = await connect({
      connector:new WalletConnectConnector({
        chains: [ArbitrumGoerli_Chain],
        options:{
          projectId:'771442ad0bb44651b29f3163b52147d3'
        }
      })
    })
    console.log('链接钱包成功',connectInfo)
    localStorage.setItem('wagmi.injected.shimDisconnect', "1")
    setShow(false)
    onLogin(connectInfo.account)
  }

  const {switchNetwork} = useSwitchNetwork()

  async function onConnect(){
    if (address){
      if (chain?.id != ArbitrumGoerli_Chain.id){
        switchNetwork && switchNetwork(ArbitrumGoerli_Chain.id)
      }else {
        setShow(true)
      }
    }else {
      setShow(true)
    }
  }

  async function onDisconnect(){
    await disconnect()
    setShow(false)
    console.log('断开钱包成功')
    dispatch(saveAuthorization({}))
    dispatch(saveCurrentInfo({}))
    console.log('清除本地存的数据')
    localStorage.removeItem('wagmi.injected.shimDisconnect')
  }

  function onLogin(account:string){
    console.log('进行登录操作')
    console.log('本地签名信息authorizationInfo===',authorizationInfo)
    if (!authorizationInfo.expiration || authorizationInfo.expiration <= dayjs().unix()){
      console.log('已过期，重新签名')
      onLoginRequest(account)
    }else {
      console.log('没有过期,判断当前账户是否是本地存的用户')
      if (authorizationInfo.address && authorizationInfo.address.toUpperCase() == account.toUpperCase()){
        console.log('是同一账户')
        setIsLogin(true)
      }else {
        console.log('不是同一账户，重新登录')
        onLoginRequest(account)
      }
    }
  }
  function onLoginRequest(account:string){
    let params:any = {}
    if (referral_code){
      params.referral_code = referral_code
    }
    postEthRequestRequest(API_ETH_REQUEST + '?address=' + account,params).then(async(result:any)=>{
      console.log('result===',result)
      const currentTime = dayjs().unix()

      const provider = new ethers.BrowserProvider(global.ethereum)
      const signer = await provider.getSigner();

      signer?.signMessage(result.result).then((res:any)=>{
        console.log('sign res===',res)

        postRequest(API_ETH_VERIFY + '?sig=' + res,{},{
          headers: {
            "authorization":result.authorization,
            ...axiosHeaders
          }
        }).then((useInfo:any)=>{
          console.log('API_ETH_VERIFY useInfo==',useInfo)

          console.log('将数据存入本地')
          dispatch(saveAuthorization({
            address:account,
            authorization:result.authorization,
            expiration:currentTime + 60 * 60 * 24
          }))

          dispatch(saveCurrentInfo(useInfo))

          setTimeout(() => {
            console.log('3')

            userInfo.refetch()
          }, 1500);
          setIsLogin(true)
        }).catch((err:any)=>{
          console.log('err===',err)
        })
      }).catch((e:any)=>{
        console.log('e===',e)
      })
    }).catch((e:any)=>{
      console.log('e===',e)
    })
  }

  function onUserClick(){
    if (isLogin){
      console.log('4')
      userInfo.refetch()
      naviagate('/personal')
    }else {
      if (address){
        console.log('onUserClick address===',address)

        onLogin(address)
      }else {
        message.warning(t('Please Connect Wallet'))
      }
    }
    setShow(!show)
  }

  return (
    <FlexView>
      <ContentView onClick={onConnect} style={{
        background:address ? '#AE7AFF' : 'transparent'
      }}>
        <Text style={{color:chain?.id != ArbitrumGoerli_Chain.id ? '#f00' : '#fff'}}>{address ? (chain?.id != ArbitrumGoerli_Chain.id? t('Wrong network') : formatAccount(address))  : t('Connect Wallet')}</Text>
      </ContentView>
      {show && (address ? <ConnectWalletModal>
        <FlexViewEnd>
          <Close onClick={()=>setShow(false)} src='/images/close.png'/>
        </FlexViewEnd>
        <FlexViewBetween>
          <WalletItem onClick={onDisconnect}>
            <WalletName style={{color:'red'}}>{t('DisConnect')}</WalletName>
          </WalletItem>
          <WalletItem onClick={onUserClick}>
            <WalletName>{isLogin ? t('Personal Center') : t('Login')}</WalletName>
          </WalletItem>
        </FlexViewBetween>
      </ConnectWalletModal> : <ConnectWalletModal>
        <FlexViewEnd>
          <Close onClick={()=>setShow(false)} src='/images/close.png'/>
        </FlexViewEnd>
        <FlexViewBetween>
          <WalletItem onClick={onMetamask}>
            <WalletIcon src='/images/metamask.png' />
            <WalletName>{t('Metamask')}</WalletName>
          </WalletItem>
          <WalletItem onClick={onWalletconnect}>
            <WalletIcon src='/images/walletconnect.png' />
            <WalletName>{t('WalletConnect')}</WalletName>
          </WalletItem>
        </FlexViewBetween>
      </ConnectWalletModal>)}
    </FlexView>
  );
}
const WalletIcon = styled.img`
  width:${autoWidthVW(30)};
  height:${autoWidthVW(30)};
  margin-bottom:${autoWidthVW(10)};
  @media (max-width: 768px) {
    width:24px;
    height:24px;
    margi-bottom:6px
  }
`
const WalletItem = styled(FlexViewCenterColumn)`
  margin-top:${autoWidthVW(20)};
  padding:${autoWidthVW(15)} 0;
  width:${autoWidthVW(150)};
  border-radius:${autoWidthVW(16)};
  cursor:pointer;
  &:hover{
    background:#f8f8f8
  };
  @media (max-width: 768px) {
    margin-top:10px;
    padding:8px 0;
    width:100px;
    border-radius:8px
  }
`
const Close = styled.img`
  width:${autoWidthVW(35)};
  height:${autoWidthVW(35)};
  cursor:pointer;
  @media (max-width: 768px) {
    width:24px;
    height:24px;
  }
`
const ConnectWalletModal = styled(FlexViewColumn)`
  padding:${autoWidthVW(10)};
  position:absolute;
  right:0;
  top:${autoWidthVW(50)};
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #FFF;
  background: #000;
  box-shadow: 4px 4px 0px 0px rgba(255, 255, 255, 0.25);
  @media (max-width: 768px) {
    padding:6px;
    top:50px
  }
`
const Text = styled.span`
  color:#fff;
  font-size:${autoWidthVW(16)};
  font-weight: 700;
  font-family: var(--font-Satoshi);
  @media (max-width: 768px) {
    font-size:14px
  }
`
const Balance = styled(Text)`
  font-weight: 700;
  color:#585858;
  font-family: var(--font-Satoshi);
`
const WalletName = styled(Balance)`
  font-size:${autoWidthVW(12)};
  @media (max-width: 768px) {
    font-size:12px
  }
`
const ContentView = styled(FlexViewCenter)`
  width:fit-content;
  cursor:pointer;
  padding:${autoWidthVW(10)} ${autoWidthVW(24)};
  border-radius:${autoWidthVW(2)};
  @media (max-width: 768px) {
    padding:8px 12px
  }
`
