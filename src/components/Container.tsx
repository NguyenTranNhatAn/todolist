import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyle } from '../style/globalStyle';
import RowComponent from './RowComponent';
import { ArrowLeft2 } from 'iconsax-react-native';
import { colors } from '../constants/colors';
import TextComponent from './TextComponent';
import { fontFamily } from '../constants/fontFamilies';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title?: string,
  back?: boolean;
  //react node là compoment của react
  right?: ReactNode,
  children: ReactNode,
  isScroll?: boolean,
}
const Container = (props: Props) => {
  const { title, back, right, children, isScroll } = props;
  const navigation:any= useNavigation()
  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.bgcolor}}>
      <View style={[globalStyle.container,{flex:1}]}>
      <RowComponent styles={{
        paddingHorizontal: 16,
        paddingBottom: 16,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {
          back &&
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <ArrowLeft2 size={24} color={colors.text} />
          </TouchableOpacity>
        }
        <View style={{ flex: 1, zIndex: -1 }}>
          {
            title &&
            <TextComponent
              flex={0}
              font={fontFamily.bold}
              size={16}
              styles={{ textAlign: 'center', marginLeft: back ? -24 : 0 }}
              text={title} />
          }

        </View>
      </RowComponent>
      {
        isScroll ?
          <ScrollView style={{ flex: 1, flexGrow: 1 }}>
            {children}
          </ScrollView>
          :
          <View style={{flex:1}}>{children}</View>

  }

    </View>
    </SafeAreaView>
  )
}

export default Container

const styles = StyleSheet.create({})