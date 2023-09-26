import styled from "styled-components";
import React, {createContext, useContext, useState} from "react";
import { useNetwork } from "wagmi";
import { autoWidthVW, formatAccount } from "@/Common";
import { getScanLink, getScanName } from "@/Contract/chains";
import { FlexView, FlexViewBetween } from "@/Components/View";
import Lottie from 'react-lottie';
import * as PendingJson from '../../public/lottlie/loading_pending.json'
import * as SuccessJson from '../../public/lottlie/loading_success.json'
import * as ErrorJson from '../../public/lottlie/loading_error.json'
import * as ConfirmJson from '../../public/lottlie/loading_confirm.json'



import { isBrowser } from "react-device-detect";


export enum LoadingType {
  confirm=0,
  pending=1,
  error=2,
  success=3
}

const LoadingConfig:any = {
  [LoadingType.confirm]:{
    icon:ConfirmJson,
    color:"#FF8D3A",
    title:"Waiting for Confirmation",
    closeIcon:'/images/close_black.png'
  },
  [LoadingType.pending]:{
    icon:PendingJson,
    color:"#62DCF7",
    title:"Waiting for Transaction",
    closeIcon:'/images/close_black.png'
  },
  [LoadingType.error]:{
    icon:ErrorJson,
    color:"#CF3E34",
    title:"Transaction Error",
    closeIcon:'/images/close_black.png'
  },
  [LoadingType.success]:{
    icon:SuccessJson,
    color:"#7FF89F",
    title:"Transaction Success",
    closeIcon:'/images/close_black.png'
  }
}
export const LoadingContext = createContext({
  show: (type:LoadingType,message:string,hash?:string) => {

  },
  hide:()=>{}
})
export function useLoadingContext() {
  const loadingContext = useContext(LoadingContext)
  return loadingContext
}
export default function LoadingProvider({children}:any) {

  const [visible,setVisible] = useState(false)
  const [type,setType] = useState(LoadingType.pending)
  const [message,setMessage] = useState("")
  const [hash,setHash] = useState("")
  return(
      <LoadingContext.Provider
          value={{
              show:(type, message,hash) => {
                  setType(type)
                  setMessage(message)
                  setHash(hash||"")
                  setVisible(true)
              },
              hide:()=>{
                  setVisible(false)
              }
          }}
      >
          {children}
          <Loading
              visible={visible}
              type={type}
              message={message}
              hash={hash}
              onClose={()=>setVisible(false)}
          ></Loading>
      </LoadingContext.Provider>
  )
}
function Loading({visible,type,message,hash,onClose}:any) {
  const {chain={id:1}} = useNetwork()
  if(!visible){
      return null;
  }
  return(
    <ModalView className="animate__animated animate__fadeIn animate__faster">
      <LoadingContent className="animate__animated animate__slideInUp animate__faster">
        <FlexViewBetween>
          <FlexView>
            <Lottie options={{
              loop: true,
              autoplay: true,
              animationData: LoadingConfig[type].icon,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }} width={isBrowser?100:40} height={isBrowser?100:40}/>
            <LoadingTitle
              style={{color:LoadingConfig[type].color}}
            >
              {LoadingConfig[type].title}
            </LoadingTitle>
          </FlexView>
          <CloseIcon onClick={onClose} src={LoadingConfig[type].closeIcon}/>
        </FlexViewBetween>
        <DescContainer>
          {(type===LoadingType.confirm || type===LoadingType.error) && <LoadingDesc>
            {message}
          </LoadingDesc>}
          {(type===LoadingType.pending || type===LoadingType.success) && <LoadingDesc>
            Transaction Hash: {formatAccount(hash || message)}
          </LoadingDesc>}
          {(type!==LoadingType.confirm) && <LoadingHashView
            onClick={()=>{
              window.open(getScanLink(chain.id,hash || message,"transaction"))
            }}
          >
            ViewOn {getScanName(chain.id)}
          </LoadingHashView>}
          {type===LoadingType.confirm && <LoadingTips>
            Confirm this transaction in your wallet
          </LoadingTips>}
        </DescContainer>
      </LoadingContent>
    </ModalView>
  )
}
const CloseIcon = styled.img`
  width:${autoWidthVW(40)};
  height:${autoWidthVW(40)};
  position:relative;
  @media (max-width: 768px) {
    width:${autoWidthVW(20)};
    height:${autoWidthVW(20)};
  };
  cursor:pointer
`
const LoadingContent = styled.div`
  width:${autoWidthVW(959)};
  padding:${autoWidthVW(40)} ${autoWidthVW(30)};
  position:relative;
  background-color: #fff;
  border-radius: ${autoWidthVW(20)};
  @media (max-width: 768px) {
    width:90%;
    padding:${autoWidthVW(20)} ${autoWidthVW(15)};
    border-radius: ${autoWidthVW(10)};
  };
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
`
const LoadingTitle = styled.div`
  font-size: ${autoWidthVW(32)};
  font-family: Axiforma-Bold, Axiforma;
  font-weight: bold;
  color: #000;
  margin-left: ${autoWidthVW(30)};
  @media (max-width: 768px) {
    font-size: ${autoWidthVW(14)};
    margin-left: ${autoWidthVW(10)};
  }
`
const DescContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items: flex-start;
  font-size: ${autoWidthVW(36)};
  padding-left:${autoWidthVW(150)};
  @media (max-width: 768px) {
    padding-left:${autoWidthVW(50)};
    font-size: ${autoWidthVW(18)};
  }
`
const LoadingDesc = styled.div`
  font-size: ${autoWidthVW(32)};
  font-family: Axiforma-Bold, Axiforma;
  font-weight: bold;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-all;
  width:${autoWidthVW(650)};
  @media (max-width: 768px) {
    font-size: ${autoWidthVW(16)};
    width:100%
  };
`
const LoadingTips = styled.div`
  font-size: ${autoWidthVW(20)};
  font-weight: 400;
  color: #000;
  margin-top:${autoWidthVW(15)};
  opacity:0.8;
  @media (max-width: 768px) {
    font-size: ${autoWidthVW(14)};
  }
`
const LoadingHashView = styled.div`
  font-size:${autoWidthVW(16)};
  color:#000;
  margin-top:${autoWidthVW(15)};
  cursor:pointer;
  text-decoration:underline;
  @media (max-width: 768px) {
    font-size:${autoWidthVW(14)};
  }
`
const StatusIcon = styled.img`
  width:${autoWidthVW(112)};
  height:auto;
  @media (max-width: 768px) {
    width:${autoWidthVW(40)};
  }
`
const ModalView = styled.div`
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color:rgba(0,0,0,0.7);
  z-index:99;
  display:flex;
  align-items:center;
  justify-content:center;
`
