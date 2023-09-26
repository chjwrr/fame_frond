import styled from "styled-components";
import React, {createContext, useContext, useState} from "react";
import {animated, useSpring } from "react-spring";
import { useNetwork } from "wagmi";
import { isBrowser } from "react-device-detect"
import { getScanLink, getScanName } from "@/Contract/chains";
import { formatAccount } from "@/Common";

export enum LoadingType {
  confirm=0,
  pending=1,
  error=2,
  success=3
}

const LoadingConfig:any = {
  [LoadingType.confirm]:{
    icon:'',
    color:"#9165F6",
    title:"Waiting for Confirmation",
    closeIcon:'',
  },
  [LoadingType.pending]:{
    icon:'',
    color:"#62DCF7",
    title:"Waiting for Transaction",
    closeIcon:'',
  },
  [LoadingType.error]:{
    icon:'',
    color:"#CF3E34",
    title:"Transaction Error",
    closeIcon:'',
  },
  [LoadingType.success]:{
    icon:'',
    color:"#7FF89F",
    title:"Transaction Success",
    closeIcon:'',
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
  const [type,setType] = useState(LoadingType.confirm)
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
            {(type===LoadingType.confirm || type===LoadingType.pending) && <RotateImage icon={LoadingConfig[type].icon}></RotateImage>}
            {(type===LoadingType.success || type===LoadingType.error) && <StatusIcon src={LoadingConfig[type].icon}></StatusIcon>}
            <LoadingTitle
              style={{color:LoadingConfig[type].color}}
            >
              {LoadingConfig[type].title}
            </LoadingTitle>
          </FlexView>
          <Image onClick={onClose} src={LoadingConfig[type].closeIcon}/>
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
function RotateImage({icon}:any) {
  const styles = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 360 },
    config: {
        duration: 1500,
    },
  })

  return (
    <StatusIcon
      style={{...styles}}
      src={icon}
    ></StatusIcon>
  )
}
const Image = styled.img`
  width: 30px;
  height: 30px;
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`
const FlexViewBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const FlexView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const LoadingContent = styled.div`
  width:960px;
  padding:40px 30px;
  position:relative;
  background-color: #fff;
  border-radius: 20px;
  @media (max-width: 768px) {
    width:350px;
    padding:20px 15px;
    border-radius: 10px
  };
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
`
const LoadingTitle = styled.div`
  font-size: 32px;
  font-family: Axiforma-Bold, Axiforma;
  font-weight: bold;
  color: #000;
  margin-left:30px;
  @media (max-width: 768px) {
    font-size: 14px;
    margin-left: 10px
  }
`
const DescContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items: flex-start;
  font-size: 36px;
  padding-left:150px;
  @media (max-width: 768px) {
    padding-left:50px;
    font-size:18px
  }
`
const LoadingDesc = styled.div`
  font-size: 32px;
  font-family: Axiforma-Bold, Axiforma;
  font-weight: bold;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  @media (max-width: 768px) {
    font-size:16px
  }
`
const LoadingTips = styled.div`
  font-size:20px;
  font-weight: 400;
  color: #000;
  margin-top:15px;
  opacity:0.8;
  @media (max-width: 768px) {
    font-size: 14px
  }
`
const LoadingHashView = styled.div`
  font-size:14px;
  color:#000;
  margin-top:15px;
  cursor:pointer;
  text-decoration:underline;
  @media (max-width: 768px) {
    font-size:12px
  }
`
const StatusIcon = styled(animated.img)`
  width:112px;
  height:auto;
  @media (max-width: 768px) {
    width:40px
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
