import { View, Text } from 'react-native'
import React from 'react'
import { globalStyle } from '../style/globalStyle'
import TextComponent from './TextComponent';
import { fontFamily } from '../constants/fontFamilies';
import { colors } from '../constants/colors';
interface Props{
    text:string,
    font?:string,
    size?:number,
    color?:string,
}
const TitleComponent = (props:Props) => {
    const {text,font,size,color}=props;
  return (
  <TextComponent text={text} font={font ?? fontFamily.semiBold} color={color} size={size??20}/>
  )
}

export default TitleComponent