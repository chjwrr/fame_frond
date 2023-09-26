import classNames from "classnames";
import styles from './styles.module.scss'
import { Popover } from 'antd';


export default function Question({
    placement = 'right',
    content='',
    type='big',
}:{
    placement?:'top' | 'left' | 'right' | 'bottom',
    content?:string,
    type?:'big' | 'small'
}){
    return  content ? <Popover placement={placement} content={()=><div className={styles.tipView}>
        <span className={styles.tipTitle}>{content}</span>
    </div>}>
        <img className={classNames(type == 'big' ? styles.question : styles.questionSmall)}
        src='/images/question.png'/>
    </Popover> :  <img className={classNames(type == 'big' ? styles.question : styles.questionSmall)}
      src='/images/question.png'/>
}

export function HomeFill({
    placement = 'top',
    content='',
    type='big',
}:{
    placement?:'top' | 'left' | 'right' | 'bottom',
    content?:string,
    type?:'big' | 'small'
}){
    return  <Popover placement={placement} content={content}>
        <img className={styles.filled} src='/images/filled.png'/>
    </Popover>
}