import { useState,useEffect } from "react"
import styled from "styled-components"
import * as _ from 'lodash';
import { useNetwork } from "wagmi"
import { autoWidthVW } from "@/Common";
import useTranslationLanguage from "@/Hooks/useTranslationLanguage";
import { FlexView, FlexViewBetween, FlexViewCenter, FlexViewColumn } from "../View";
export default function TokenList({onClose,onChoose,tokenList}:any){
  const {t} = useTranslationLanguage()
  const {chain = {id: 1}} = useNetwork()

  // const onChange = _.debounce((e:any)=>{
  //   if (e.target.value.startsWith('0x') || e.target.value.startsWith('0X')){
  //     const filterArr = swapTokens.data?.tokenList.filter((item:any)=>{
  //       return item.value[chain.id].toUpperCase() == e.target.value.toUpperCase()
  //     })
  //     setTokenList(filterArr)
  //   }else {
  //     const filterArr = swapTokens.data?.tokenList.filter((item:any)=>{
  //       return item.name.indexOf(e.target.value.toUpperCase()) > -1
  //     })
  //     setTokenList(filterArr)
  //   }
  // },500)

  function onChooseToken(index:number){
    onChoose && onChoose(tokenList[index])
    onClose && onClose()
  }

  return <TokenView className="animate__animated animate__fadeInUp animate__faster">
    <FlexViewBetween>
      <div>{t('Select a Token')}</div>
      <Close onClick={onClose} src={'/images/close_black.png'}/>
    </FlexViewBetween>
    {/* <SearchView>
      <Close>
        <Image src={'/images/search.png'} fill alt=''/>
      </Close>
      <Input placeholder={t('Search Name or paste address')} onChange={onChange}/>
    </SearchView> */}
    {
      tokenList.length == 0 ? <FlexViewCenter>
      <div>{t('no result')}</div>
      </FlexViewCenter> : tokenList.map((item:any,index:number)=>{
        return <Item key={index+'tokenlist'} onClick={()=>onChooseToken(index)}>
          <FlexView>
            <TokenIcon src={`/tokens/${item.name}.png`} />
            <Title>{item.name}</Title>
          </FlexView>
          {index != tokenList.length - 1 && <Line/>}
        </Item>
      })
    }
  </TokenView>
}
const Title = styled(FlexView)`
  font-size:${autoWidthVW(24)};
  font-family:var(--font-Poppins);
  font-weight:600;
  color:#000;
`
const Item = styled(FlexViewColumn)`
  width:100%;
  cursor:pointer;
  :hover {
    opacity:0.8
  }
`
const Line = styled.div`
  background:#868AAE;
  width:100%;
  height:1px;
  margin:${autoWidthVW(24)} 0;
  @media (max-width: 768px) {
    margin:${autoWidthVW(12)} 0;
  }
`
const Input = styled.input`
  outline: none;
  outline: none;
  border: none;
  background: transparent;
  width:100%;
  margin-left:${autoWidthVW(24)};
  color:#fff;
  font-size:${autoWidthVW(28)};
  @media (max-width: 768px) {
    margin-left:${autoWidthVW(12)};
    font-size:${autoWidthVW(14)};
  }
`
const SearchView = styled(FlexView)`
  width:100%;
  background: #242837;
  border-radius: ${autoWidthVW(16)};
  padding:${autoWidthVW(20)};
  margin:${autoWidthVW(30)} 0;
  @media (max-width: 768px) {
    border-radius: ${autoWidthVW(8)};
    padding:${autoWidthVW(14)};
    margin:${autoWidthVW(25)} 0;
  }
`
const Close = styled.img`
  width:${autoWidthVW(30)};
  height:${autoWidthVW(30)};
  cursor:pointer;
  @media (max-width: 768px) {
    width:${autoWidthVW(20)};
    height:${autoWidthVW(20)};
  }
`
const TokenIcon = styled.img`
  width:${autoWidthVW(48)};
  height:${autoWidthVW(48)};
  margin-right:${autoWidthVW(10)};
  cursor:pointer;
  @media (max-width: 768px) {
    width:${autoWidthVW(24)};
    height:${autoWidthVW(24)};
    margin-right:${autoWidthVW(5)};
  }
`

const TokenView = styled(FlexViewColumn)`
  background: #fff;
  border-radius: ${autoWidthVW(24)};
  padding:${autoWidthVW(24)} ${autoWidthVW(16)};
  width:${autoWidthVW(600)};
  // height:${autoWidthVW(400)};
  overflow:scroll;
  @media (max-width: 768px) {
    border-radius: ${autoWidthVW(12)};
    padding:${autoWidthVW(12)} ${autoWidthVW(8)};
    width:100%;
    height:${autoWidthVW(500)};
  }
`