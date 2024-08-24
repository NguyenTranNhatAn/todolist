import { View, Text, ViewStyle, StyleProp, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyle } from '../style/globalStyle';
import { colors } from '../constants/colors';
interface Props {
  children: ReactNode,
  bgColor?: string,
  styles?: StyleProp<ViewStyle>,
  onPress?: () => void
}
const CardComponent = (props: Props) => {
  const { children, bgColor, styles, onPress } = props;
  return onPress ? (
    <TouchableOpacity onPress={onPress} style={[globalStyle.inputContainer, { padding: 12, backgroundColor: bgColor ?? colors.gray }, styles]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[globalStyle.inputContainer, { padding: 12, backgroundColor: bgColor ?? colors.gray }, styles]}>
      {children}
    </View>
  )
}

export default CardComponent