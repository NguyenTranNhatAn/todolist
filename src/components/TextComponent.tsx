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
    color?: string,
    flex?: number,
    styles?: StyleProp<TextStyle>,
    line?:number

}
const TextComponent = (props: Props) => {
    const { line,text, font, size, color, flex, styles } = props;
    return (
        <Text numberOfLines={line} style={[globalStyle.text,
        {
           
            flex: flex ?? 1,
            fontSize: size ?? 14,
            textAlign:'justify',
            fontFamily: font ?? fontFamily.regular,
            color: color ?? colors.desc,
        }, styles]}>
            {text}
        </Text>

    )
}

export default TextComponent