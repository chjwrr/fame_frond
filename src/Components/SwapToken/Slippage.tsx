import { autoWidthVW } from "@/Common"
import useTranslationLanguage from "@/Hooks/useTranslationLanguage"
import { changeDeadline, changeSlippage, deadlineDefault, slippageDefault, useDeadline, useSlippage } from "@/Redux/setting"
import { useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { FlexView, FlexViewBetween, FlexViewCenter, FlexViewColumn, SpaceHeight } from "../View"

export default function Slippage({onClose}:any){
  const {t} = useTranslationLanguage()
  const [slippageValue,setSlippageValue] = useState(useSlippage())
  const [deadlineTime,setDeadlingTime] = useState(useDeadline())
  const dispatch = useDispatch()
  function onSlippageInputChange(e:any){
    setSlippageValue(e.target.value)
  }
  function onSlippageInputBlur(){
    if (Number(slippageValue) <= 0){
      setSlippageValue(slippageDefault)
      dispatch(changeSlippage(slippageDefault))
    }else {
      dispatch(changeSlippage(slippageValue))
    }
  }
  function onSlippagetTimeChange(e:any){
    setDeadlingTime(e.target.value)
  }
  function onSlippagetTimeBlur(){
    if (Number(deadlineTime) < Number(deadlineDefault)){
      setDeadlingTime(deadlineDefault)
      dispatch(changeDeadline(deadlineDefault))
    }else {
      dispatch(changeDeadline(deadlineTime))
    }
  }
  return <SlippageView>
    <FlexViewBetween>
      <Title>{t('Trad Settings')}</Title>
      <Close onClick={onClose} src={'/images/closecolor.png'} />
    </FlexViewBetween>
    <SpaceHeight height={24}/>
    <Title2>{t('Slippage')}</Title2>
    <SpaceHeight height={12}/>
    <FlexView>
      <SlippageItem select={slippageValue == '0.1'} onClick={()=>{
        setSlippageValue('0.1')
        dispatch(changeSlippage('0.1'))
      }}>
        <Title2>0.1</Title2>
      </SlippageItem>
      <SlippageItem select={slippageValue == '0.5'} onClick={()=>{
        setSlippageValue('0.5')
        dispatch(changeSlippage('0.5'))
      }}>
        <Title2>0.5</Title2>
      </SlippageItem>
      <SlippageItem select={slippageValue == '1.0'} onClick={()=>{
        setSlippageValue('1.0')
        dispatch(changeSlippage('1.0'))
      }}>
        <Title2>1.0</Title2>
      </SlippageItem>
      <SlippageItem select={
        slippageValue != '1.0' && slippageValue != '0.1' && slippageValue != '0.5'
      }>
        <SlippageInput value={slippageValue} onChange={onSlippageInputChange} onBlur={onSlippageInputBlur}/>
        <Title2>%</Title2>
      </SlippageItem>
    </FlexView>
    <SpaceHeight height={24}/>
    <FlexViewBetween>
      <Title2>{t('Tx deadline (mins)')}</Title2>
      <SlippageTimeView select={false}>
        <SlippageInput value={deadlineTime} onChange={onSlippagetTimeChange} onBlur={onSlippagetTimeBlur}/>
        <Title2>mins</Title2>
      </SlippageTimeView>
    </FlexViewBetween>
  </SlippageView>
}

const Title2 = styled(FlexView)`
  font-size:${autoWidthVW(18)};
  font-family:var(--font-Poppins);
  font-weight:600;
  color:#000;
`
const Title = styled(FlexView)`
  font-size:${autoWidthVW(24)};
  font-family:var(--font-Poppins);
  font-weight:600;
  color:#000;
`
const SlippageInput = styled.input`
  outline: none;
  outline: none;
  border: none;
  background: transparent;
  width:100%;
  color:#000;
`
const SlippageItem = styled(FlexViewCenter)<{
  select:Boolean
}>`
  background: ${({select})=>select?'#00ff94':'#f8f8f8'};
  border-radius: ${autoWidthVW(8)};
  width:fit-content;
  padding:${autoWidthVW(10)} ${autoWidthVW(24)};
  cursor:pointer;
  margin-right:${autoWidthVW(24)};
  @media (max-width: 768px) {
    border-radius: ${autoWidthVW(8)};
    padding:${autoWidthVW(5)} ${autoWidthVW(12)};
    margin-right:${autoWidthVW(12)};
  }
`
const SlippageTimeView = styled(SlippageItem)`
  width:50%;
  background:#f8f8f8;
  margin-right:0;
  @media (max-width: 768px) {
    width:${autoWidthVW(100)};
  }
`
const SlippageView = styled(FlexViewColumn)`
  width:${autoWidthVW(600)};
  background: #fff;
  border-radius: ${autoWidthVW(24)};
  padding:${autoWidthVW(24)} ${autoWidthVW(16)};
  @media (max-width: 768px) {
    width:90%;
    border-radius: ${autoWidthVW(24)};
    padding:${autoWidthVW(14)} ${autoWidthVW(20)};
  }
`
const Close = styled.img`
  width:${autoWidthVW(48)};
  height:${autoWidthVW(48)};
  cursor:pointer;
  @media (max-width: 768px) {
    width:${autoWidthVW(24)};
    height:${autoWidthVW(24)};
  }
`