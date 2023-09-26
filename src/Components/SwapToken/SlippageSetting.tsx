import { autoWidthVW } from "@/Common"
import useTranslationLanguage from "@/Hooks/useTranslationLanguage"
import { useModalContext } from "@/Provider/modalProvider"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { FlexView, FlexViewBetween, FlexViewCenter, FlexViewColumn } from "../View"
import Slippage from './Slippage'

export default function SlippageSetting(){
  const modalContext = useModalContext()

  function onSlippage(){
    modalContext.show(<Slippage onClose={()=>{
      modalContext.hidden()
    }}/>,{
      style:{
        justifyContent:'center'
      }
    })
  }
  return <Setting onClick={onSlippage} src='/images/setting.png'/>
}
const Setting = styled.img`
  width: ${autoWidthVW(24)};
  height: ${autoWidthVW(24)};
  cursor:pointer;
  @media (max-width: 768px) {
  }
`