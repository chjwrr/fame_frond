import { FlexViewCenter } from "../View";
import { ColorRing } from 'react-loader-spinner'

export default function LoadingRow({width = 100}:{width?:number}){
  return <ColorRing
    height={width}
    width={width}
    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    ariaLabel="blocks-loading"
    wrapperStyle={{}}
    visible={true}
  />
}