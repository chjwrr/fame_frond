'use client'
import styles from './index.module.scss'
import commonStyles from '@/Common/common.module.scss'
import { useEffect, useState } from 'react';
import Footer from '@/Components/Footer'
import LoadingView from '@/Components/LoadingView';
import { SpaceHeight } from '@/Components/View';
import { useModalContext } from '@/Provider/modalProvider';
import TradeModal from '@/appComponents/Home/TradeModal';
import { postRequest } from '@/API';
import { API_SEARCH_TWITTER } from '@/API/API';
import { formatName, nFormatter } from '@/Common';
import { formatUnits } from 'ethers';
import { useAccount, useNetwork } from 'wagmi';
import { message } from 'antd';
import { searchTwitterChainID } from '@/dataConfig';


export default function Home() {
  const [windowHeight,setWindowHeight] = useState('fit-content')
  useEffect(()=>{
    setWindowHeight(window.innerHeight + 'px')
  },[])
  const [searchValue,setSearchValue] = useState('elonmusk')
  const [isLoading,setIsLoading] = useState(false)
  const [showResult,setShowResult] = useState(false)
  const [searchResult,setSearchResult] = useState<any>({})
  const {address} = useAccount()

  function onEnter(){
    onSearch()
  }
  function onKeyUp(e:any){
    if (e.keyCode == 13){
      onSearch()
    }
  }
  function onChange(e:any){
    setSearchValue(e.target.value)
  }

  // https://api.fame.markets/v1/search_twitter?handle=lidangzzz

  function onSearch(){
    if (!searchValue) return
    setIsLoading(true)
    setShowResult(false)
    postRequest(API_SEARCH_TWITTER + '?handle=' + searchValue,{
      chain_id:searchTwitterChainID
    }).then((result:any)=>{
      setIsLoading(false)
      setSearchResult(result)
      setShowResult(true)
    }).catch((e:any)=>{
      setIsLoading(false)
    })
  }
  function onClose(){
    setShowResult(false)
  }

  return (
    <div className={commonStyles.mainView}>
      <div className={`${commonStyles.columnCenter} ${styles.bgView}`} style={{height:windowHeight}}>
        <div className={commonStyles.mainContent}>
          <div className={commonStyles.columnCenter}>
            <div className={commonStyles.row}>
              <img className={styles.logo} src={'/images/logo.png'}/>
              <span className={styles.title}>fame.markets</span>
            </div>
            <span className={styles.des}>Invest in your favorite social account, earn shares from social capital</span>
            <div className={`${commonStyles.rowBetween} ${styles.searchView}`}>
              <LoadingView isLoading={isLoading}/>
              <div className={commonStyles.row} style={{flex:1}}>
                <img className={styles.icon} src={'/images/search.png'}/>
                <span className={styles.inptTitle}>twitter.com/</span>
                <input 
                type="search"
                value={searchValue} 
                placeholder='enter a twitter handle, e.g elonmusk' 
                className={styles.input}
                onChange={onChange}
                onKeyUp={onKeyUp}
                />
              </div>
              <img className={styles.icon1} onClick={onEnter}  src={'/images/corner.png'}/>
            </div>
            {showResult && <Result result={searchResult} onClose={onClose}/>}
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}
function Result({onClose,result}:any){
  const [showMore,setShowMore] = useState(false)
  const modalContext = useModalContext()
  const {address} = useAccount()
  function onTrade(){
    if (!address){
      message.warning('Please Connect Wallet')
      return
    }
    modalContext.show(<TradeModal result={result} onClose={()=>{
      modalContext.hidden()
    }} onSuccess={()=>{
      modalContext.hidden()
    }}/>)
  }

  const avatarInfo = <div className={commonStyles.row} style={{cursor:'pointer'}} onClick={()=>{
    window.open('https://twitter.com/' + result.screen_name)
  }}>
    <img className={styles.avatar}  src={result.profile_image_url}/>
    <div className={commonStyles.column}>
      <span className={styles.resTitle}>{formatName(result.name)}</span>
      <div className={commonStyles.row}>
        <span className={styles.resDes}>@{result.screen_name}</span>
        <img className={styles.share} src={'/images/share.png'}/>
      </div>
    </div>
  </div>

  const followerInfo = <div className={commonStyles.column}>
    <span className={styles.resNumber}>{Math.floor(Number(result.follower_no) / 1000)}K</span>
    <span className={styles.resDes}>Follower number</span>
  </div>

  const priceInfo = <div className={`${commonStyles.column} ${styles.priceView}`}>
    <span className={styles.resNumber}>{formatUnits(result.more.price_in_eth)} ETH</span>
    <span className={styles.resDes}>Price</span>
  </div>

  const tradeInfo = <div className={styles.tradeView}>
    <div onClick={onTrade} className={styles.tradeButton}>Trade</div>
    <div className={commonStyles.row} style={{cursor:'pointer'}} onClick={()=>setShowMore(!showMore)}>
      <span className={styles.resDes}>{showMore ? 'Close' : 'More'}</span>
      <img className={styles.icon} src={showMore ? '/images/arrup.png' : '/images/arrdown.png'}/>
    </div>
  </div>


  return <div className={`${commonStyles.column} ${styles.result}`}>
    <div className={commonStyles.rowEnd}>
      <img className={styles.close} onClick={onClose} src={'/images/closeicon.png'}/>
    </div>
    <div className={`${commonStyles.column} ${styles.resultContent}`}>
      <div className={commonStyles.webView}>
        <div className={`${commonStyles.rowBetween} ${styles.resSpace}`}>
          {avatarInfo}
          <div className={styles.resLine}/>
          {followerInfo}
          <div className={styles.resLine}/>
          {priceInfo}
          <div className={styles.resLine}/>
          {tradeInfo}
        </div>
      </div>
      <div className={commonStyles.mobileView}>
        <div className={`${commonStyles.column} ${styles.resSpace}`}>
          {avatarInfo}
          <SpaceHeight height={20}/>
          <div className={commonStyles.rowBetween}>
            {followerInfo}
            <div className={styles.resLine}/>
            {priceInfo}
          </div>
          {tradeInfo}
        </div>
      </div>
      {showMore && <div className={`${commonStyles.column} ${styles.resultContentMore}`}>
        <div className={`${commonStyles.rowBetween} ${styles.resM}`}>
          <div className={`${commonStyles.columnCenter} ${styles.reMoreItem}`}>
            <span className={styles.resDes}>Coins In Circulation</span>
            <span className={styles.resNumber}>{result.more.supply}</span>
          </div>
          <div className={`${commonStyles.columnCenter} ${styles.reMoreItem}`}>
            <span className={styles.resDes}>Total value locked</span>
            <span className={styles.resNumber}>{formatUnits(result.more.tvl_in_eth)} ETH</span>
          </div>
          <div className={`${commonStyles.columnCenter} ${styles.reMoreItem}`}>
            <span className={styles.resDes}>Market Caps</span>
            <span className={styles.resNumber}>{formatUnits(result.more.mc)} ETH</span>
          </div>
          <div className={`${commonStyles.columnCenter} ${styles.reMoreItem}`} style={{borderRight:0}}>
            <span className={styles.resDes}>Account Loyalty</span>
            <span className={styles.resNumber}>{result.more.subject_income} ETH</span>
          </div>
        </div>
      </div>}
    </div>
  </div>
}