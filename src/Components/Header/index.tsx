"use client"
import React, { useEffect, useState } from "react";
import styles from './styles.module.scss'
import commonStyles from '../../Common/common.module.scss'
import classNames from "classnames";
import ConnectWallet from "../ConnectWallter";
import { useAccount } from "wagmi";
import useTranslationLanguage from "@/Hooks/useTranslationLanguage";
import Language from "../Language";
import { docsURL, twitterURL } from "@/dataConfig";
import { useNavigate } from "umi";
export default function Header() {
  const navigate = useNavigate()

  const {t} = useTranslationLanguage()
  return(
    <div className={classNames(commonStyles.mainView,styles.headerMain)}>
      <div className={classNames(commonStyles.mainContent)}>
        <div className={commonStyles.webView}>
          <div className={classNames(commonStyles.rowBetween)}>
            <div className={commonStyles.row}>
              <div onClick={()=>{
                window.open(twitterURL)
              }} className={styles.title}>Twitter</div>
              <div onClick={()=>{
                window.open(docsURL)
              }} className={styles.title}>Docs</div>
            </div>
            <ConnectWallet/>
          </div>
        </div>
        <div className={commonStyles.mobileView}>
          <div className={classNames(commonStyles.rowBetween)}>
            <img className={styles.menu} src='/images/leftmenu.png' onClick={()=>navigate('/')} />
            <ConnectWallet/>
          </div>
        </div>
      </div>
    </div>
  )
}