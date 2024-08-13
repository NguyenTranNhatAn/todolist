import { View, Text } from 'react-native'
import React from 'react'
import { globalStyle } from '../style/globalStyle';
import { fontFamily } from '../constants/fontFamilies';
import { colors } from '../constants/colors';
interface Props {
    text: string,
    size?: number,
    font?: string,
    color?:string,
    flex?:number;
    
}
const TextComponent = (props: Props) => {
    const { text, font, size, color,flex } = props;
    return (
        <Text style={[globalStyle.text,
        {
            flex:flex??1,
            fontSize: size ?? 14,
            fontFamily:font ?? fontFamily.regular,
            color: color ?? colors.desc,
        }]}>
            {text}
        </Text>

    )
}

export default TextComponent