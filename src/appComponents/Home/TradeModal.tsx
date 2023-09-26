import LoadingView from '@/Components/LoadingView'
import styles from './styles.module.scss'
import commonStyles from '@/Common/common.module.scss'
import { SpaceHeight } from '@/Components/View'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { message } from 'antd'
import { useSendTransactionOld, useTradeInfo, useUserInfo } from '@/Contract'
import { formatBalance, formatName } from '@/Common'
import LoadingRow from '@/Components/LoadingRow'
import { useFameContract } from '@/Hooks/useContract'
import { Fame_ADDRESSSES } from '@/Contract/addresses'
import { ZeroAddress, formatUnits } from 'ethers'
import { useCurrentUserInfo } from '@/Redux/setting'
export default function TradeModal({onClose,result,onSuccess}:any) {
  const [selectIndex,setSelectIndex] = useState(0)
  const [amount,setAmount] = useState(0)
  const [isLoading,setIsLoading] = useState(false)
  const {address} = useAccount()
  const tradeInfo = useTradeInfo(result.subject_id,amount,selectIndex)
  const fameContract = useFameContract(Fame_ADDRESSSES)
  const sendTransaction = useSendTransactionOld()
  const currentUserInfo = useCurrentUserInfo()
  const userInfo = useUserInfo()

  // supply == 1的时候 最后一个key不让卖
  // supply > 1的时候 sellAmt <= userBal && sellAmt <= supply -1

  function getMax(){
    const supply = Number((result.supply || result.more.supply))
    console.log('supply===',supply)
    console.log('tradeInfo.data===',tradeInfo.data)
    let maxValue = 0
    if (supply == 1){
      maxValue =  Number(tradeInfo.data?.keyAmout) - 1
    }
    if (supply > 1){
      maxValue = Math.min(tradeInfo.data?.keyAmout,supply - 1)
    }
    console.log('maxValue===',maxValue)
    return maxValue
  }


  function onAmountChange(e:any){
    if (!Number(e.target.value)){
      setAmount(0)
    }else {
      if(selectIndex == 1){
        if (Number(e.target.value) > getMax()){
          setAmount(getMax())
        }else {
          setAmount(Number(e.target.value))
        }
      }else {
        setAmount(Number(e.target.value))
      }
    }
  }

  function onMinus(){
    if (tradeInfo.isLoading)return
    if (!amount) return
    if (!Number(amount)) return
    if (amount <= 0) return
    const value = Number(amount) - 1
    setAmount(value)
  }

  function onAdd(){
    if (tradeInfo.isLoading)return
    if (selectIndex == 1){
      if (amount >= getMax()){
        return
      }else {
        const value = Number(amount) + 1
        setAmount(value)
      }
    }else {
      const value = Number(amount) + 1
      setAmount(value)
    }

  }
  function onClick(){
    if (!amount) return
    if (!address){
      message.warning('Please Connect Wallet')
      return
    }
    if (tradeInfo.isLoading){
      message.warning('Data loading...')
      return
    }

    if (!fameContract){
      return
    }
    if (selectIndex == 1 && Number(tradeInfo.data?.keyAmout) <= 1){
      if (Number(tradeInfo.data?.keyAmout) == 0){
        message.warning('Quantity is 0')
      }else {
        message.warning('The quantity you have is at least 1')
      }
      return
    }
    if (!Number(tradeInfo.data?.balance)){
      message.warning('No balance yet')
      return
    }
    setIsLoading(true)
    if (selectIndex == 0){
      const args = [result.subject_id,amount, currentUserInfo.referred_by || ZeroAddress]
      console.log('buy args=',args)

      sendTransaction.mutate({
        title:'Buy',
        func:fameContract.buyShares,
        args:args,
        valueInfo:{
          value:tradeInfo.data?.priceAfterFee
        },
        onSuccess:()=>{
          console.log('1')

          userInfo.refetch()
          onSuccess && onSuccess()
        },
        onError:()=>{
          setIsLoading(false)
        }
      })
    }else {
      const args = [result.subject_id,amount]
      console.log('sell args=',args)

      sendTransaction.mutate({
        title:'sell',
        func:fameContract.sellShares,
        args:args,
        onSuccess:()=>{
          console.log('2')

          userInfo.refetch()
          onSuccess && onSuccess()
        },
        onError:()=>{
          setIsLoading(false)
        }
      })
    }
  }

  const avatarInfo = <div className={commonStyles.row} style={{cursor:'pointer'}} onClick={()=>{
    window.open('https://twitter.com/' + result.screen_name)
  }}>
    <img className={styles.avatar} src={result.profile_image_url}/>
    <div className={commonStyles.column}>
      <span className={styles.resTitle}>{formatName(result.name)}</span>
      <div className={commonStyles.row}>
        <span className={styles.resDes}>@{result.screen_name}</span>
      </div>
    </div>
  </div>

  const priceInfo = <div className={`${commonStyles.column} ${styles.priceView}`}>
    <span className={styles.resDes}>Price</span>
    {tradeInfo.isLoading ? <LoadingRow width={20}/> : <span className={styles.resNumber}>{tradeInfo.data?.price || 0} ETH</span>}
  </div>

  const balanceInfo = <div className={commonStyles.column}>
    <div className={commonStyles.row}>
      <span className={styles.resDes}>Your Balance：</span>
      {tradeInfo.isLoading? <LoadingRow width={20}/> : <span className={styles.balance}>{formatBalance(tradeInfo.data?.balance || 0)} ETH</span>}
    </div>
    {selectIndex == 1 && <div className={commonStyles.row}>
      <span className={styles.resDes}>Your Amount：</span>
      {tradeInfo.isLoading? <LoadingRow width={20}/> : <span className={styles.balance}>{tradeInfo.data?.keyAmout}</span>}
    </div>}
  </div>
  const numberInfo =  <div className={styles.addView}>
    <span className={styles.resDes}>Quantity</span>
    <div className={commonStyles.row}>
      <img className={styles.add} onClick={onMinus} src={'/images/minus.png'}/>
      <input type='tel' className={styles.input} value={amount} onChange={onAmountChange}/>
      <img className={styles.add} onClick={onAdd} src={'/images/plus.png'}/>
    </div>
  </div>

  return (
    <div className={styles.main}>
      <LoadingView isLoading={isLoading}/>
      <div className={`${commonStyles.rowBetween} ${styles.space}`}>
        <span className={styles.title}>Trade</span>
        <img className={styles.close} onClick={onClose} src={'/images/closeicon.png'}/>
      </div>
      <div className={styles.line}/>
      <div className={`${commonStyles.column} ${styles.space}`}>
        <div className={styles.avatarView}>
          {avatarInfo}
          <SpaceHeight height={24} webheight={0}/>
          {priceInfo}
        </div>
        <div className={styles.centerLine}/>
        <div className={commonStyles.rowBetween}>
          <div onClick={()=>{
            setSelectIndex(0)
            setAmount(0)
          }} className={`${styles.selectItem} ${selectIndex == 0 && styles.selectItemSel}`}>Buy</div>
          <div onClick={()=>{
            setSelectIndex(1)
            setAmount(0)
          }} className={`${styles.selectItem} ${selectIndex == 1 && styles.selectItemSellSel}`}>Sell</div>
        </div>
        <SpaceHeight height={15}/>
        <div className={styles.avatarView}>
          {balanceInfo}
          <SpaceHeight height={20} webheight={0}/>
          {numberInfo}
        </div>
        <SpaceHeight height={15}/>
        <div className={commonStyles.rowBetween}>
          <span className={styles.resDes}>Fee</span>
          {tradeInfo.isLoading ? <LoadingRow width={20}/> : <div className={commonStyles.row}>
            <span className={styles.total}>{tradeInfo.data?.fee || 0} ETH</span>
            <span className={styles.resDes}>${tradeInfo.data?.feeUSDT}</span>
          </div>}
        </div>
        <SpaceHeight height={5}/>
        <div className={commonStyles.rowBetween}>
          <span className={styles.resDes}>Total</span>
          {tradeInfo.isLoading ? <LoadingRow width={20}/> : <div className={commonStyles.row}>
            <span className={styles.total}>{tradeInfo.data?.total || 0} ETH</span>
            <span className={styles.resDes}>${tradeInfo.data?.totalUSDT}</span>
          </div>}
        </div>

        <div onClick={onClick} className={`${styles.selectItem } ${selectIndex == 0 ? styles.selectItemSel : styles.selectItemSellSel} ${styles.button}`}>
          {selectIndex == 0 ? 'Buy Now' : 'Sell Now'}
        </div>




      </div>
    </div>
  )
}
