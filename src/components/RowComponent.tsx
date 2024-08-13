import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyle } from '../style/globalStyle';
interface Props {
    children: ReactNode,
    justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | undefined,
    onPress?: () => void,
    styles?: StyleProp<ViewStyle>
}
const RowComponent = (props: Props) => {
    const { children, justify, onPress, styles } = props;
    const localStyle = [
        globalStyle.row, { justifyContent: justify ?? 'center' },
         styles
        
    ]
    return onPress ?
        (
            <TouchableOpacity style={localStyle} onPress={onPress ? () => onPress() : undefined}>
                {children}
            </TouchableOpacity>)
        :
        (

        <View style={localStyle}>
                {children}
            </View>
        )
}

export default RowComponent