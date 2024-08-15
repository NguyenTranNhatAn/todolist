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
    flex?:number
}
const TitleComponent = (props:Props) => {
    const {text,flex,font,size,color}=props;
  return (
  <TextComponent flex={flex??1} text={text} font={font ?? fontFamily.semiBold} color={color} size={size??20}/>
)
}

export default TitleComponent