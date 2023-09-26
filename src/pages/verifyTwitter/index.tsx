'use client'
import styles from './index.module.scss'
import commonStyles from '@/Common/common.module.scss'
import { useEffect, useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import LoadingRow from '@/Components/LoadingRow';
import { useAuthorization } from '@/Redux/setting';
import { postRequest } from '@/API';
import { API_TWITTER_CALLBACK } from '@/API/API';
import dayjs from 'dayjs';
import { useUserInfo } from '@/Contract';
import { useNavigate, useSearchParams } from 'umi';

export default function VerifyTwitter() {
  const [windowHeight,setWindowHeight] = useState('fit-content')
  const navigate = useNavigate()
  const {address} = useAccount()
  const [searchParams,_] =  useSearchParams()
  const authorizationInfo = useAuthorization()
  const [isError,setIsError] = useState(false)
  const userInfo = useUserInfo()

  const isVerfiying = useRef(false)

  useEffect(()=>{
    setWindowHeight(window.innerHeight + 'px')
  },[])


  // http://localhost:3000/personal?oauth_token=p_V6IwAAAAABpfGsAAABirOOjlo&oauth_verifier=zDUh35jgtzg86noln1S0M7aO7r2oUSiQ

  const oauth_token = searchParams.get('oauth_token') || ''
  const oauth_verifier = searchParams.get('oauth_verifier') || ''

  useEffect(()=>{
    if (address && authorizationInfo.authorization){
      console.log('开始验证...',dayjs().unix())
      setTimeout(() => {
        onVerify()
      }, 1500);
    }
  },[address,authorizationInfo.authorization])


  function onVerify(){

    console.log('isVerfiying.current===',isVerfiying.current)

    if (isVerfiying.current) return

    isVerfiying.current = true


    setIsError(false)
    postRequest(API_TWITTER_CALLBACK,{
        "oauth_token":oauth_token,
        "oauth_verifier":oauth_verifier
    },{
        headers:{
            "authorization":authorizationInfo.authorization,
        }
    }).then((res:any)=>{
        console.log('res===',res)
        userInfo.refetch()
        navigate('/personal')
    }).catch((e:any)=>{
        console.log('e===',e)
        setIsError(true)
    }).finally(()=>{
      isVerfiying.current = false
    })
  }


  function onReVerify(){
    onVerify()
  }
  return (
    <div className={commonStyles.mainView}>
      <div className={styles.bgView} style={{height:windowHeight}}/>
        {isError ? <div className={`${commonStyles.row} ${styles.title} ${styles.button}`} onClick={onReVerify}>
        Network error please re-verify
        </div> : <div className={`${commonStyles.row} ${styles.title}`}>
          <LoadingRow width={50}/>
          Verifying twitter
        </div>}
    </div>
  )
}