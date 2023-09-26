import { Interface } from 'ethers';
import { RootState } from './index';
import { useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react';

export const slippageDefault:string = '0.5'
export const deadlineDefault:string = '20'

const initialState:any = {
  currentLanguage: 'en',
  slippage:slippageDefault,
  deadlineTime:deadlineDefault,
  authorization:{},
  userInfo:{}
}
export function useLanguage():string{
  return useSelector((state:RootState)=>state.setting.currentLanguage)
}
export function useSlippage(): string {
  return useSelector((state: RootState) => state.setting.slippage)
}
export function useDeadline(): string {
  return useSelector((state: RootState) => state.setting.deadlineTime)
}
export function useAuthorization() {
  return useSelector((state: RootState) => state.setting.authorization)
}
export function useCurrentUserInfo() {
  return useSelector((state: RootState) => state.setting.userInfo)
}
const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changeLanguage: (state,action:PayloadAction<string>) => {
      state.currentLanguage = action.payload
    },
    changeSlippage:(state,action:PayloadAction<string>)=>{
      state.slippage = action.payload
    },
    changeDeadline:(state,action:PayloadAction<string>)=>{
      state.deadlineTime = action.payload
    },
    saveAuthorization:(state,action:PayloadAction<any>)=>{
      state.authorization = action.payload
    },
    saveCurrentInfo:(state,action:PayloadAction<any>)=>{
      state.userInfo = action.payload
    },
  }
})

export const { changeLanguage, changeSlippage, changeDeadline, saveAuthorization, saveCurrentInfo } = settingSlice.actions
export default settingSlice.reducer

