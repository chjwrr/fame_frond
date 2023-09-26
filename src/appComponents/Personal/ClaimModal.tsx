import LoadingView from '@/Components/LoadingView';
import styles from './styles.module.scss'
import commonStyles from '@/Common/common.module.scss'
import { useState } from 'react'
import { useSendTransactionOld } from '@/Contract';
import { useFameContract } from '@/Hooks/useContract';
import { Fame_ADDRESSSES } from '@/Contract/addresses';
import { useCurrentUserInfo } from '@/Redux/setting';
export default function ClaimModal({onClose,onSuccess,value,type}:any) {
  const [isLoading,setIsLoading] = useState(false)
  const currentUserInfo = useCurrentUserInfo()
  const fameContract = useFameContract(Fame_ADDRESSSES)
  const sendTransaction = useSendTransactionOld()
  function onClaim(){
    if (!fameContract) return
    if (!currentUserInfo) return
    setIsLoading(true)

    let func:any
    let args:any = []
    if(type == 1){
      func = fameContract.withdrawDividendIncome
      let sid:any[] = []
      currentUserInfo.balances.map((it:any)=>{
        sid.push(it.subject_id)
      })
      args = [sid]
    }else if(type == 2){
      func = fameContract.withdrawReferralIncome
    }else{
      func = fameContract.withdrawSubjectIncome
    }
    console.log('args===',args)
    sendTransaction.mutate({
      title:'Claim',
      func:func,
      args:args,
      onSuccess:()=>{
        setIsLoading(false)
        onSuccess && onSuccess()
      },
      onError:()=>{
        setIsLoading(false)
      }
    })

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
        <div className={commonStyles.row}>
          <span className={styles.con}>You can claim up to
            <span className={styles.conVlue}>{value} ETH</span>
            each time.
          </span>
        </div>
        <div onClick={onClaim} className={`${commonStyles.rowCenter} ${styles.button}`}>Confirm</div>
      </div>
    </div>
  )
}