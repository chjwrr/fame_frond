import { notification } from "antd";
import axios, { AxiosRequestConfig, Method } from "axios";

export const axiosHeaders = {
  // "Content-Type":"application/x-www-form-urlencoded"
  "Content-Type":"application/json"
}
const instance = axios.create({
  headers:axiosHeaders
})
instance.defaults.timeout = 30000;
instance.defaults.baseURL = 'https://api.fame.markets/'

export async function getRequest(url:string) {
  return new Promise((resolut,reject)=>{
    instance.get(url).then((result:any)=>{
      console.log('get result=',result)
      if (result.status == 200){
        if (result.data && result.data.code == 200){
          resolut(result.data.result)
        }else {
          reject(result.data.code)
          notification.error({
            message:result.data.result
          })
        }
      }else {
        reject()
        notification.error({
          message:result.status
        })
      }
    }).catch((e:any)=>{
      console.log('get e===',e);
      reject(e)
    })
  })
}
export async function postRequest(url:string,params:any,config?:any) {
  return new Promise((resolut,reject)=>{
    instance.post(url,params,config).then((result:any)=>{
      console.log('post result=',url,result)
      if (result.status == 200){
        if (result.data && result.data.code == 200){
          resolut(result.data.result)
        }else {
          reject(result.data.code)
          if (result.data.result){
            notification.error({
              message:result.data.result
            })
          }
        }
      }else{
        reject()
        notification.error({
          message:result.status
        })
      }
    }).catch((e:any)=>{
      console.log('post e===',e);
      if (e.response && e.response.data && e.response.data.result)
      notification.error({
        message:e.response.data.result
      })
      reject(e)
    })
  })
}

export async function postEthRequestRequest(url:string,params:any,config?:any) {
  return new Promise((resolut,reject)=>{
    instance.post(url,params,config).then((result:any)=>{
      console.log('post result=',url,result)
      if (result.status == 200){
        if (result.data && result.data.code == 200){
          resolut({
            result:result.data.result,
            authorization:result.headers.authorization
          })
        }else {
          reject(result.data.code)
          notification.error({
            message:result.data.result
          })
        }
      }else{
        reject()
        notification.error({
          message:result.status
        })
      }
    }).catch((e:any)=>{
      console.log('post e===',e);
      if (e.response && e.response.data && e.response.data.result)
      notification.error({
        message:e.response.data.result
      })
      reject(e)
    })
  })
}