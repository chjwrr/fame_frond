import { FlexViewCenter } from "../View";
import { ColorRing } from 'react-loader-spinner'

export default function LoadingView({width = 50,isLoading=false}:{width?:number,isLoading:boolean}){
  if (!isLoading)return <></>
  return <div style={{
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(0,0,0,0.5)',
    position:'absolute',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    left:0,
    top:0,
    zIndex:1
  }} onClick={(e:any)=>{e.stopPropagation()}}>
    <ColorRing
      height={width}
      width={width}
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      visible={true}
    />
  </div>
}