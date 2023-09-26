import { useEffect, useRef, useState } from "react";
import { CountDownView, Title, CountText } from "./styles";


function formatTimer(time:number){
  let td = String(Math.floor(time / (60 * 60 * 24))).padStart(2, '0'),
  th = String(Math.floor(time / (60 * 60) % 24)).padStart(2, '0'),
  tm = String(Math.floor(time / 60 % 60)).padStart(2, '0'),
  ts = String(Math.floor(time % 60)).padStart(2, '0')
  return td + '天 ' + th + '时: ' + tm + '分: ' + ts + '秒'
}

export default function CountDown({time,onCountDown}:{time:string,onCountDown?:()=>void}){
  const nowtime = useRef(new Date())
  const endtime = useRef(new Date(time))
  let leftTime = useRef(Math.floor((endtime.current.getTime() - nowtime.current.getTime()) / 1000))
  // let leftTime = useRef(10)

  const [showTime,setShowTime] = useState(leftTime.current)
  useEffect(()=>{
    const interval = setInterval(()=>{
      leftTime.current--
      if (leftTime.current <= 0){
        interval && clearInterval(interval)
        onCountDown && onCountDown()
      }else {
        setShowTime((pre:number)=>pre - 1)
      }
    },1000)
    return ()=>{
      interval && clearInterval(interval)
    }
  },[])

  return <CountDownView>
    <Title>倒计时</Title>
    <CountText>{formatTimer(showTime)}</CountText>
  </CountDownView>
}