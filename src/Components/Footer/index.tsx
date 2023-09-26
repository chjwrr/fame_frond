"use client"
import styles from './styles.module.scss'
import commonStyles from '@/Common/common.module.scss'
import useTranslationLanguage from "@/Hooks/useTranslationLanguage";
import { cookiesPolicyURL, discordURL, privacyPolicyURL, telegramURL, twitterURL } from "@/dataConfig";
export default function Footer() {
  const {t} = useTranslationLanguage()
  return(
    <div className={styles.footView}>
      <div className={commonStyles.mainContent}>
        <div className={commonStyles.webView}>
          <div className={commonStyles.rowBetween}>
            <div className={commonStyles.row}>
              <span onClick={()=>{
                window.open(cookiesPolicyURL)
              }} className={styles.title}>Cookies Policy</span>
              <span onClick={()=>{
                window.open(privacyPolicyURL)
              }} className={styles.title}>Privacy Policy</span>
              <span className={styles.title}>Reserved by @famemake</span>
            </div>
            <div className={commonStyles.row}>
              <span className={styles.title}>Connect:</span>
              <span onClick={()=>{
                window.open(twitterURL)
              }} className={styles.title}>Twitter</span>
              <span  onClick={()=>{
                window.open(discordURL)
              }}className={styles.title}>Discord</span>
              <span onClick={()=>{
                window.open(telegramURL)
              }} className={styles.title} style={{margin:0}}>Telegram</span>
            </div>
          </div>
        </div>
        <div className={commonStyles.mobileView}>
          <div className={commonStyles.rowBetween}>
            <span className={styles.title}>Privacy Policy</span>
            <span className={styles.title}>Reserved by @famemake</span>
          </div>
        </div>
      </div>
    </div>
  )
}