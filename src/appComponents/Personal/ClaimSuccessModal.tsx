import LoadingView from '@/Components/LoadingView';
import styles from './styles.module.scss'
import commonStyles from '@/Common/common.module.scss'
import { useState } from 'react'
export default function ClaimSuccessModal({onClose,onSuccess,value}:any) {
  const [isLoading,setIsLoading] = useState(false)
  function onClaim(){
    onClose()
  }
  return (
    <div className={styles.main}>
      <LoadingView isLoading={isLoading}/>
      <div className={`${commonStyles.rowBetween} ${styles.space}`}>
        <span className={styles.title}>Trade</span>
        <img className={styles.close} onClick={onClose} src={'/images/closeicon.png'}/>
      </div>
      <div className={styles.line}/>
      <div className={`${commonStyles.columnCenter} ${styles.space}`}>
        <img className={styles.icon} src={'/images/check.png'}/>
        <div className={commonStyles.row}>
          <span className={styles.con}>You successfully claimed</span>
          <span className={styles.conVlue}>{value} ETH</span>
        </div>
        {/* <div onClick={onClaim} className={`${commonStyles.rowCenter} ${styles.button}`}>View Transactions</div> */}
      </div>
    </div>
  )
}