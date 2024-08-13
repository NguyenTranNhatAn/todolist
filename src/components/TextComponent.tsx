import { View, Text, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import { globalStyle } from '../style/globalStyle';
import { fontFamily } from '../constants/fontFamilies';
import { colors } from '../constants/colors';
import { StyleProp } from 'react-native';
interface Props {
    text: string,
    size?: number,
    font?: string,
    color?:string,
    flex?:number,
    styles?: StyleProp<TextStyle>
    
}
const TextComponent = (props: Props) => {
    const { text, font, size, color,flex,styles } = props;
    return (
        <Text style={[globalStyle.text,
        {
            flex:flex??1,
            fontSize: size ?? 14,
            fontFamily:font ?? fontFamily.regular,
            color: color ?? colors.desc,
        },styles]}>
            {text}
        </Text>

    )
}

export default TextComponent