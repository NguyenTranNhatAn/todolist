import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import TextComponent from './TextComponent';
import { fontFamily } from '../constants/fontFamilies';
import { colors } from '../constants/colors';
interface Props {
    text: string,
    color?: string,
    isLoading?: boolean,
    onPress: () => void,

}
const ButtonComponent = (props: Props) => {
    const { text, color, isLoading, onPress } = props;
    return (
        <TouchableOpacity
        onPress={onPress}
            disabled={isLoading}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: color ? color: isLoading? colors.gray : colors.blue,
                padding: 8,
                borderRadius: 12,
            }}>
            {isLoading ? <ActivityIndicator /> :
                <TextComponent text={text}
                    flex={0}
                    size={16}
                    font={fontFamily.semiBold}
                    styles={{
                        textTransform: 'uppercase',
                    }} />
            }
        </TouchableOpacity>
    )
}

export default ButtonComponent