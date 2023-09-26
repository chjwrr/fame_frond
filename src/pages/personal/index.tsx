'use client'
import styles from './index.module.scss'
import commonStyles from '@/Common/common.module.scss'
import { SpaceHeight } from '@/Components/View';
import { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard'
import { message } from 'antd';
import { useModalContext } from '@/Provider/modalProvider';
import TradeModal from '@/appComponents/Home/TradeModal';
import ClaimModal from '@/appComponents/Personal/ClaimModal';
import ClaimSuccessModal from '@/appComponents/Personal/ClaimSuccessModal';
import { postRequest, axiosHeaders } from '@/API';
import { API_TWITTER_CALLBACK, API_TWITTER_REQUEST } from '@/API/API';
import { useAccount } from 'wagmi';
import { usePersonalKeysInfo, usePersonalTopInfo, useUserInfo } from '@/Contract';
import { formatAccount, formatName } from '@/Common';
import LoadingRow from '@/Components/LoadingRow';
import { formatUnits } from 'ethers';
import { twitterCallBackURL } from '@/dataConfig';
import { useAuthorization, useCurrentUserInfo } from '@/Redux/setting';
import { useNavigate } from 'umi';

export default function PersonalCenter() {
  const [windowHeight,setWindowHeight] = useState('fit-content')
  const navigate = useNavigate()
  const userInfo = useUserInfo()
  const currentUserInfo = useCurrentUserInfo()
  const {address} = useAccount()

  console.log('PersonalCenter userInfo===',userInfo.data)
  useEffect(()=>{
    setWindowHeight(window.innerHeight + 'px')
  },[])

  function onCopy(){
    if (currentUserInfo.referral_code){
      const inviteLink = window.location.origin + '/?referral_code=' + currentUserInfo.referral_code
      copy(inviteLink)
      message.success('copy!')
    }else{
      console.log('currentUserInfo.====',currentUserInfo)
    }
  }

  const avaDes = <span className={styles.resDesDes}>{currentUserInfo.desc || ''}</span>

  const avatarInfo = <div className={commonStyles.column}  style={{cursor:'pointer'}} onClick={()=>{
    if (currentUserInfo.screen_name){
      window.open('https://twitter.com/' + currentUserInfo.screen_name)
    }
  }}>
    {currentUserInfo.ProfileImageUrl ? <img className={styles.avatar} src={currentUserInfo.ProfileImageUrl || ''} />: <div>
      {/* <Blockie seed={String(address || '')} size={20}/> */}
      <div style={{
        width:50,
        height:50,
        background:"red"
      }}></div>
    </div>}
    <span className={styles.resTitle}>{currentUserInfo.name || formatAccount(address)}</span>
    <span className={styles.resDes}>{currentUserInfo.screen_name ? '@' + currentUserInfo.screen_name : ''}</span>
    <div className={commonStyles.webView}>
      {avaDes}
    </div>

  </div>

  const fameView = <div className={styles.fameView}>
    <span className={styles.fameTitle}>FameScore</span>
    <SpaceHeight height={8} webheight={8}/>
    <span className={styles.fameValue}>***</span>
    <SpaceHeight height={8} webheight={8}/>
    <span className={styles.fameDes}>Last Updated</span>
    <SpaceHeight height={2}/>
    <span className={styles.fameTitle}>2023-09-20</span>
  </div>

  const inviteView = <div className={`${styles.fameView} ${styles.invite}`}>
    <div className={commonStyles.row}>
      <span className={styles.fameTitle}>Invite Link</span>
      <img onClick={onCopy} className={styles.inviteIcon}  src='/images/copy.png'/>
    </div>
    <span className={styles.link}>{window.location.href + '/?referral_code=' + currentUserInfo.referral_code}</span>
  </div>

  return (
    <div className={commonStyles.mainView}>
      <div className={styles.bgView} style={{height:windowHeight}}/>
        <div className={commonStyles.mainContent}>
          <div className={styles.personView}>
            <div className={commonStyles.webView}>
              <div className={styles.leftView}>
                <div className={commonStyles.row}>
                  <img className={styles.back} onClick={()=>{
                    navigate('/')
                  }} src='/images/arrleft.png'/>
                  <span className={styles.title}>Personal Center</span>
                </div>
                {avatarInfo}
                <div className={styles.leftLine}/>
                {fameView}
                {inviteView}
              </div>
            </div>
            <div className={commonStyles.mobileView}>
              <div className={styles.leftView}>
              <span className={styles.title}>Personal Center</span>
              <div className={commonStyles.rowBetween}>
                  {avatarInfo}
                  {fameView}
                </div>
                <div className={commonStyles.rowBetween}>
                  {avaDes}
                  {inviteView}
                </div>
              </div>
            </div>

            <div className={styles.rightView}>
              <TopView/>
              <div className={commonStyles.rowBetween}>
                <span className={styles.youkey}>Your Keys</span>
              </div>
              <KeyCom/>
            </div>
          </div>
        </div>
    </div>
  )
}
function KeyCom(){
  const personalKeysInfo = usePersonalKeysInfo()
  console.log('personalKeysInfo===',personalKeysInfo.data)
  return <div className={`${commonStyles.column} ${styles.keyContent}`}>
    <div className={`${commonStyles.webView} ${styles.resSpace1}`}>
      <div className={commonStyles.rowBetween}>
        <div style={{flex:2}}><span className={styles.resDes}>Keys</span></div>
        <div style={{flex:1}}> <span className={styles.resDes}>Followers</span></div>
        <div style={{flex:1}}> <span className={styles.resDes}>Price</span></div>
        <div style={{flex:3,display:'flex',flexDirection:'row',justifyContent:'flex-end'}}> <span className={styles.resDes}>Data</span></div>
        </div>
    </div>
    {
      personalKeysInfo.isLoading? <LoadingRow/> : (!personalKeysInfo.data ? <div className={commonStyles.rowCenter}>
        <span className={styles.resDes}>You don't have some keys</span>
      </div> : personalKeysInfo.data?.keys.map((item:any,index:number)=>{
        return <KeyItem item={item} key={index+'list'}/>
      }))
    }
  </div>
}
function TopView(){
  const modalContext = useModalContext()
  const currentUserInfo = useCurrentUserInfo()
  const personalTopInfo = usePersonalTopInfo()
  function onClaim(type:number){
    if (type == 3){
      if (!currentUserInfo.twitter_id){
        return
      }
    }
    if (!personalTopInfo.data){
      return
    }
    let value = "0"
    if (type == 1){
      value = personalTopInfo.data?.Dividend_old
    }else if (type == 2){
      value = personalTopInfo.data?.Referrals_old
    }else {
      value = personalTopInfo.data?.Referrals_old
    }
    if (!Number(value)){
      return
    }

    modalContext.show(<ClaimModal type={type} value={value} onClose={()=>{
      modalContext.hidden()
    }} onSuccess={()=>{
      modalContext.hidden()
      personalTopInfo.refetch()
      modalContext.show(<ClaimSuccessModal value={value} onClose={()=>{
        modalContext.hidden()
      }}/>)
    }}/>)
  }


  const leftView = <div className={styles.topItem}>
    <div className={commonStyles.rowBetween}>
      <div className={commonStyles.row}>
        <img className={styles.topIcon} src={'/images/usd.png'} />
        <span className={styles.fameTitle}>Dividend</span>
      </div>
      <div onClick={()=>onClaim(1)} className={`${commonStyles.rowCenter} ${styles.topCliam}`}>CLAIM</div>
    </div>
    <div className={commonStyles.rowBetween}>
      <div className={commonStyles.row}>
        <img className={styles.topRewardIcon} src={'/images/rewardicon.png'}/>
        {personalTopInfo.isLoading ? <LoadingRow width={20}/> : <span className={styles.topRewardTitle}>{personalTopInfo.data?.Dividend || 0}</span>}
      </div>
    </div>
  </div>
  const centerView = <div className={styles.topItem}>
    <div className={commonStyles.rowBetween}>
    <div className={commonStyles.row}>
      <img className={styles.topIcon} src={'/images/users.png'}/>
      <span className={styles.fameTitle}>Referrals</span>
    </div>
    <div onClick={()=>onClaim(2)} className={`${commonStyles.rowCenter} ${styles.topCliam}`}>CLAIM</div>
    </div>
    <div className={commonStyles.rowBetween}>
      <div className={commonStyles.row}>
        <img className={styles.topRewardIcon}  src={'/images/rewardicon.png'}/>
        {personalTopInfo.isLoading ? <LoadingRow width={20}/> : <span className={styles.topRewardTitle}>{personalTopInfo.data?.Referrals || 0}</span>}
      </div>
    </div>
  </div>
  const rightView = <div className={styles.topItem}>
    <div className={commonStyles.rowBetween}>
      <div className={commonStyles.row}>
        <img className={styles.topIcon} src={'/images/farm.png'}/>
        <span className={styles.fameTitle}>Loyalty fee</span>
      </div>
      <div onClick={()=>onClaim(3)} className={`${commonStyles.rowCenter} ${styles.topCliam} ${!currentUserInfo.twitter_id && styles.topCliamDis}`}>CLAIM</div>
    </div>
    <ConnectTwitter isRequest={personalTopInfo.isLoading} value={personalTopInfo.data?.LoyaltyFee || 0}/>
  </div>
  const [selectIndex,setSelectIndex] = useState(0)
  return <div className={`${commonStyles.row} ${styles.topView}`}>
    <div className={`${commonStyles.webView} ${commonStyles.row}`}>
      {leftView}
      {centerView}
      {rightView}
    </div>
    <div className={`${commonStyles.mobileView} ${commonStyles.column}`}>
      <div className={commonStyles.rowBetween}>
        <div onClick={()=>{
          setSelectIndex(0)
        }} className={`${commonStyles.rowCenter} ${styles.mobsel} ${selectIndex == 0 && styles.mobselDis}`}>Dividend</div>
        <div onClick={()=>{
          setSelectIndex(1)
        }} className={`${commonStyles.rowCenter} ${styles.mobsel} ${selectIndex == 1 && styles.mobselDis}`}>Referrals</div>
        <div onClick={()=>{
          setSelectIndex(2)
        }} className={`${commonStyles.rowCenter} ${styles.mobsel} ${selectIndex == 2 && styles.mobselDis}`}>Loyalty fee</div>
      </div>
      {selectIndex == 0? leftView : selectIndex == 1 ? centerView : rightView}
    </div>
  </div>
}
function ConnectTwitter({isRequest,value}:any){
  const [isLoading,setIsLoading] = useState(false)
  const {address} = useAccount()
  const currentUserInfo = useCurrentUserInfo()
  const authorizationInfo = useAuthorization()

  function onConnectTwitter(){
    if (!address) return
    // if (currentUserInfo.twitter_id) return
    if (isLoading) return
    setIsLoading(true)
    postRequest(API_TWITTER_REQUEST,{
      "redirect_uri": twitterCallBackURL,
    },{
      headers:{
        "authorization":authorizationInfo.authorization,
      }
    }).then((res:any)=>{
      console.log('res===',res)
      window.open(res)
      setIsLoading(false)
    }).catch((e:any)=>{
      console.log('e===',e)
      setIsLoading(false)
    })

  }
  return currentUserInfo.twitter_id ?  <div className={commonStyles.row}>
    <img className={styles.topRewardIcon} src={'/images/rewardicon.png'}/>
    {isRequest ? <LoadingRow width={20}/> : <span className={styles.topRewardTitle} onClick={onConnectTwitter}>{value}</span>}
    </div> : <div onClick={onConnectTwitter} className={`${commonStyles.rowCenter} ${styles.connect} ${currentUserInfo.twitter_id && styles.connectDis}`}>
    {isLoading ? <LoadingRow width={20}/> : 'Connect Twitter'}
  </div>

}

function KeyItem({item}:any){
  const [showMore,setShowMore] = useState(false)
  const modalContext = useModalContext()

  function onTrade(){
    modalContext.show(<TradeModal result={item} onClose={()=>{
      modalContext.hidden()
    }} onSuccess={()=>{
      modalContext.hidden()
    }}/>)
  }

  const avatarInfo = <div className={commonStyles.row} style={{cursor:'pointer'}} onClick={()=>{
    window.open('https://twitter.com/' + item.screen_name)
  }}>
    <img className={styles.avatar1} src={item.profile_image_url}/>
    <div className={commonStyles.column}>
      <span className={styles.resTitle1}>{formatName(item.name)}</span>
      <div className={commonStyles.row}>
        <span className={styles.resDes}>@{item.screen_name}</span>
      </div>
    </div>
  </div>

  const followerInfo = <div className={`${commonStyles.column} ${styles.priceView}`}>
    <div className={commonStyles.mobileView}>
      <span className={styles.resDes}>Follower number</span>
    </div>
    <span className={styles.resNumber}>{Math.floor(Number(item.follower_no) / 1000)}K</span>
  </div>

  const priceInfo = <div className={`${commonStyles.column} ${styles.priceView}`}>
    <div className={commonStyles.mobileView}>
      <span className={styles.resDes}>Price</span>
    </div>
    <span className={styles.resNumber}>{formatUnits(item.price)} ETH</span>
  </div>

  const moreInfo = <div className={commonStyles.row} style={{cursor:'pointer'}} onClick={()=>setShowMore(!showMore)}>
    <span className={`${styles.resDes} ${styles.moreWidth}`}>{showMore ? 'Close' : 'More'}</span>
    <img className={styles.icon} src={showMore ? '/images/arrup.png' : '/images/arrdown.png'}/>
  </div>
  const tradeInfo = <div className={styles.tradeView}>
    <div onClick={onTrade} className={styles.tradeButton}>Trade</div>
    <div className={styles.resLine}/>
    <div className={commonStyles.webView}>
      {moreInfo}
    </div>
  </div>
  

  return <div className={`${commonStyles.column} ${styles.result}`}>
      <div className={commonStyles.webView}>
        <div className={`${commonStyles.rowBetween} ${styles.resSpace}`}>
          <div style={{flex:2}}>{avatarInfo}</div>
          <div style={{flex:1}}>{followerInfo}</div>
          <div style={{flex:1}}>{priceInfo}</div>
          <div style={{flex:3,display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>{tradeInfo}</div>
        </div>
      </div>
      <div className={commonStyles.mobileView}>
        <div className={`${commonStyles.column} ${styles.resSpace}`} style={{width:'100%'}}>
          <div className={`${commonStyles.rowBetween}`}>
            {avatarInfo}
            {tradeInfo}
          </div>
          <SpaceHeight height={16}/>
          <div className={commonStyles.rowEnd}>{moreInfo}</div>
        </div>
      </div>
      {showMore && <div className={`${commonStyles.column} ${styles.resultContentMore}`}>
        <div className={`${commonStyles.rowBetween} ${styles.resM}`}>
          <div className={`${commonStyles.mobileView} ${styles.reMoreItem}`} style={{width:'100%',height:'100%'}}>
            <div className={commonStyles.rowBetween} style={{width:'100%',height:'100%'}}>
              <div className={commonStyles.rowCenter}>{followerInfo}</div>
              <div className={styles.resLine1}/>
              <div className={commonStyles.rowCenter}>{priceInfo}</div>
            </div>
          </div>
          <div className={`${commonStyles.columnCenter} ${styles.reMoreItem}`}>
            <span className={styles.resDes}>Coins In Circulation</span>
            <SpaceHeight height={4}/>
            <span className={styles.resNumber}>{item.supply.toString()}</span>
          </div>
          <div className={`${commonStyles.columnCenter} ${styles.reMoreItem}`}>
            <span className={styles.resDes}>Total value locked</span>
            <SpaceHeight height={4}/>
            <span className={styles.resNumber}>{formatUnits(item.tvl)} ETH</span>
          </div>
          <div className={`${commonStyles.columnCenter} ${styles.reMoreItem}`}>
            <span className={styles.resDes}>Market Caps</span>
            <SpaceHeight height={4}/>
            <span className={styles.resNumber}>{formatUnits(item.mc)} ETH</span>
          </div>
          <div className={`${commonStyles.columnCenter} ${styles.reMoreItem}`} style={{borderRight:0}}>
            <span className={styles.resDes}>Account Loyalty</span>
            <SpaceHeight height={4}/>
            <span className={styles.resNumber}>{formatUnits(item.subjectIncome)} ETH</span>
          </div>
          <div className={styles.spaceLine}/>
        </div>
      </div>}
  </div>
}