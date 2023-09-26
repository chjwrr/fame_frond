import { LiquidityTokens, SwapTokens, autoWidthVW, formatBalance } from "@/Common"
import useTranslationLanguage from "@/Hooks/useTranslationLanguage"
import { useModalContext } from "@/Provider/modalProvider"
import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { FlexView, FlexViewBetween, FlexViewCenter, FlexViewColumn } from "../View"
import TokenList from "./TokenList"
import { useWalletBalance } from "@/Contract"
import LoadingRow from "../LoadingRow"
import debounce from 'lodash/debounce';

interface SwapTokenInterface {
  editable?:Boolean,
  coin?:string,
  max?:Boolean,
  onChoose?:(info:any)=>void,
  value?:string,
  onValueChange?:(info:any)=>void,
  showBalance?:Boolean,
  isLoading?:Boolean,
  canMax?:Boolean
}

export default function SwapToken({canMax=false,isLoading=false,showBalance=true,coin,editable=true,max=true,onChoose,value='',onValueChange}:SwapTokenInterface){
  const {t} = useTranslationLanguage()
  const [inputValue,setInpuValue] = useState(value)
  const [selectCoin,setSelectCoin] = useState(coin)
  const walletBalance = useWalletBalance()
  useEffect(()=>{
    setSelectCoin(coin)
  },[coin])
  useEffect(()=>{
    setInpuValue(value)
  },[value])

  const debouncedSave = useCallback(
    debounce((nextValue:string) => {
      onValueChange && onValueChange(nextValue)
    }, 500),
    [],
  )

  const modalContext = useModalContext()
  function onChange(e:any){
    setInpuValue(e.target.value)
		debouncedSave(e.target.value);
  }
  function onMax(){
    if (canMax && walletBalance.data && selectCoin){
      setInpuValue(walletBalance.data[selectCoin])
      onValueChange && onValueChange(walletBalance.data[selectCoin] + '')
    }
  }
  function onChooseToken(){
    modalContext.show(<TokenList tokenList={SwapTokens} onClose={()=>{
      modalContext.hidden()
    }} onChoose={(tokenInfo:any)=>{
      setSelectCoin(tokenInfo.name)
      onChoose && onChoose(tokenInfo)
    }}/>,{
      style:{
        justifyContent:'center'
      }
    })
  }
  return <SwapView>
    <FlexViewBetween>
      <LeftView onClick={onChooseToken}>
        {selectCoin ? <FlexView>
          <Title>{selectCoin}</Title>
        </FlexView> : <Title>{t('Select Token')}</Title>}
        <Arrow  src={'/images/arr_down.png'}/>
      </LeftView>
      {
        isLoading ? <LoadingRow width={20}/> : <Input disabled={!editable} value={inputValue} placeholder="0.00" onChange={onChange}/>
      }
    </FlexViewBetween>
    <FlexView>
      {
        !walletBalance.data ? <LoadingRow width={20}/> : <Balance onClick={onMax}>{t('Balance')}:{selectCoin ? formatBalance(walletBalance.data[selectCoin],6) : 0}</Balance>
      }
    </FlexView>
  </SwapView>
}
export function LiquidityToken({canMax=false,isLoading=false,showBalance=true,coin,editable=true,max=true,onChoose,value='',onValueChange}:SwapTokenInterface){
  const {t} = useTranslationLanguage()
  const [inputValue,setInpuValue] = useState(value)
  const [selectCoin,setSelectCoin] = useState(coin)
  const walletBalance = useWalletBalance()
  useEffect(()=>{
    setSelectCoin(coin)
  },[coin])
  useEffect(()=>{
    setInpuValue(value)
  },[value])

  const debouncedSave = useCallback(
    debounce((nextValue:string) => {
      onValueChange && onValueChange(nextValue)
    }, 500),
    [],
  )
  function onMax(){
    if (canMax && walletBalance.data && selectCoin){
      setInpuValue(walletBalance.data[selectCoin])
      onValueChange && onValueChange(walletBalance.data[selectCoin] + '')
    }
  }
  const modalContext = useModalContext()
  function onChange(e:any){
    setInpuValue(e.target.value)
		debouncedSave(e.target.value);
  }

  function onChooseToken(){
    if (!editable) return
    modalContext.show(<TokenList tokenList={LiquidityTokens} onClose={()=>{
      modalContext.hidden()
    }} onChoose={(tokenInfo:any)=>{
      setSelectCoin(tokenInfo.name)
      onChoose && onChoose(tokenInfo)
    }}/>,{
      style:{
        justifyContent:'center'
      }
    })
  }

  return <SwapView>
    <FlexViewBetween>
      <BalanceLiqui>{t('Input')}</BalanceLiqui>
      {
        !walletBalance.data ? <LoadingRow width={20}/> : <BalanceLiqui onClick={onMax}>{t('Balance')}:{selectCoin ? formatBalance(walletBalance.data[selectCoin],6) : 0}</BalanceLiqui>
      }
    </FlexViewBetween>
    <FlexViewBetween>
      {
        isLoading ? <LoadingRow width={20}/> : <Input style={{textAlign:'left',margin:0}} disabled={!editable} value={inputValue} placeholder="0.00" onChange={onChange}/>
      }
      <FlexView style={{cursor:'pointer'}} onClick={onChooseToken}>
        <Title>{coin}</Title>
        {editable && <Arrow src={'/images/arr_down.png'}/>}
      </FlexView>
    </FlexViewBetween>
  </SwapView>
}
const Balance = styled(FlexView)`
  font-size:${autoWidthVW(18)};
  font-family:var(--font-Poppins);
  font-weight:400;
  color:#9f9f9f;
  margin-top:${autoWidthVW(10)};
  cursor:pointer
`
const BalanceLiqui = styled(Balance)`
  margin-top:0;
  color:#000;
  margin-bottom:${autoWidthVW(10)};
`
const Title = styled(FlexView)`
  font-size:${autoWidthVW(24)};
  font-family:var(--font-Poppins);
  font-weight:600;
  color:#000;
`
const Input = styled.input`
  outline: none;
  outline: none;
  border: none;
  background: transparent;
  width:60%;
  margin-left:${autoWidthVW(20)};
  color:#000;
  font-size:${autoWidthVW(24)};
  font-family:var(--font-Poppins);
  font-weight:600;
  text-align:right;
  @media (max-width: 768px) {
  };
`
const LeftView = styled(FlexView)`
  cursor:pointer;
  :hover {
    opacity:0.8
  };
  @media (max-width: 768px) {
  };
`
const Arrow = styled.img`
  width: ${autoWidthVW(18)};
  height: ${autoWidthVW(18)};
  margin-left:${autoWidthVW(8)};
  @media (max-width: 768px) {
  }
`
const SwapView = styled(FlexViewColumn)`
  width: 100%;
  height:${autoWidthVW(110)};
  border-radius: ${autoWidthVW(15)};
  padding:0 ${autoWidthVW(24)};
  justify-content:center;
  border:1px solid #000;
  margin-bottom:${autoWidthVW(10)};
  @media (max-width: 768px) {
  }
`