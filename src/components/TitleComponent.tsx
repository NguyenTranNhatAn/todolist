import { View, Text, StyleProp, TextStyle } from 'react-native'
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
    flex?:number,
    styles?: StyleProp<TextStyle>
}
const TitleComponent = (props:Props) => {
    const {text,flex,font,size,color,styles}=props;
  return (
  <TextComponent styles={styles} flex={flex??0} text={text} font={font ?? fontFamily.semiBold} color={color} size={size??20}/>
)
}

export default TitleComponent