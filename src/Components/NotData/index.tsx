import { autoWidthVW } from "@/Common"
import useTranslationLanguage from "@/Hooks/useTranslationLanguage"
import styled from "styled-components"
import { FlexView, FlexViewCenter, FlexViewCenterColumn } from "../View"

export default function NotData(){
  const {t} = useTranslationLanguage()
  return <NotdataView>
    <Notdata src={'/images/icon_nodata.png'}/>
    <div>{t('No Data')}</div>
  </NotdataView>
}
const NotdataView = styled(FlexViewCenterColumn)`
  margin:${autoWidthVW(61)} 0;
  width:100%;
`
const Notdata = styled.img`
  width:${autoWidthVW(200)};
  height:${autoWidthVW(200)};
  margin:${autoWidthVW(40)};
  @media (max-width: 768px) {
    width:${autoWidthVW(80)};
    height:${autoWidthVW(80)};
    margin:${autoWidthVW(20)};
  };
`