import { View, Text } from 'react-native'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'
import { colors } from '../constants/colors'
import { fontFamily } from '../constants/fontFamilies'
interface Props{
    color?:string,
    value:number,
    maxValue:number,
}
const CicularComponent = (props:Props) => {
    const {color,value,maxValue}=props
  return (
  <CircularProgress 
  showProgressValue={false}
  title={`${value}%`}
  titleFontSize={32}
  
  titleStyle={{
    fontFamily: fontFamily.semiBold
  }}
  inActiveStrokeColor='bc444q'
  titleColor={colors.text}
  value={value} 
  activeStrokeColor={colors.blue}/>
  )
}

export default CicularComponent