import { View, Text, ViewStyle, StyleProp } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyle } from '../style/globalStyle';
interface Props{
    children: ReactNode,
    bgColor?:string,
    styles?: StyleProp<ViewStyle>
}
const CardComponent = (props:Props) => {
    const{children,bgColor,styles}=props;
  return (
    <View style={[globalStyle.inputContainer,{padding:12}, styles]}>
        {children}
    </View>
  )
}

export default CardComponent