import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyle } from '../style/globalStyle'
interface Props{
    children:ReactNode, 
    color?:string,
    onPress?:()=>void
}
const CardImageComponent = (props:Props) => {
    const {children,color,onPress}=props;
    const renderCard=
    <ImageBackground source={require('../../assets/images/card-bg.png')} 
    imageStyle={{borderRadius:12}}
    style={[globalStyle.card]}>
      <View style={[
       
        {
        // position:'absolute',
        // top:0,
        // bottom:0,
        // right:0,
        // left:0,
        backgroundColor:color ?? 'rgba(113,77,217,0.9)',
        borderRadius:12,
        padding:12
        
      }]}>
      {children}
      </View>
    </ImageBackground>
  return onPress ?<TouchableOpacity onPress={onPress}>{renderCard}</TouchableOpacity>: (renderCard)
}

export default CardImageComponent

const styles = StyleSheet.create({})