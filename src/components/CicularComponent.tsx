import { View, Text } from 'react-native'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'
import { colors } from '../constants/colors'
import { fontFamily } from '../constants/fontFamilies'
interface Props {
  color?: string,
  value: number,
  maxValue?: number,
  radius?: number
}
const CicularComponent = (props: Props) => {
  const { color, value, maxValue, radius } = props
  return (
    <CircularProgress

      showProgressValue={false}
      title={`${value}%`}
      titleFontSize={20}
      radius={radius??46}
      titleStyle={{
        fontFamily: fontFamily.semiBold
      }}
      inActiveStrokeColor={'#3c444a'}
      titleColor={colors.text}
      value={value}
      activeStrokeColor={color ?? colors.blue} />
  )
}

export default CicularComponent