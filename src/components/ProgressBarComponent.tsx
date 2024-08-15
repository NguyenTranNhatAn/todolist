import { View, Text, DimensionValue } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { fontFamily } from '../constants/fontFamilies';
interface Props {
  size?: 'small' | 'default' | 'large',
  color?: string,
  percent: DimensionValue,
}
const ProgressBarComponet = (props: Props) => {
  const { size, color, percent } = props;
  const heightContent= size=== 'small'?6:size==='large'?12:8 
  return (
    <View style={{
      marginBottom: 16,
      marginTop: 8,
    }}>
      <View style={{
        marginTop:4, 
        height: heightContent,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 100,
      }
      }>
        <View style={{
          backgroundColor: color ?? colors.blue,
          width: percent,
          height:heightContent,
          borderRadius:100,
        }}>
          
        </View>
      </View>
      <RowComponent justify='space-between'>
        <TextComponent text='Progress' size={12} />
        <TextComponent font={fontFamily.bold} text={`${percent}`} flex={0} size={12} />
      </RowComponent>
    </View>
  )
}

export default ProgressBarComponet