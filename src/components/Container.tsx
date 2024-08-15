import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyle } from '../style/globalStyle';
interface Props{
    tilte?:string,
    back?:boolean;
    //react node là compoment của react
    right?:ReactNode,
    children:ReactNode,
}
const Container = (props:Props) => {
    const {tilte,back,right,children}= props
  return (
    <ScrollView style={[globalStyle.container,]}>
      {children}
    </ScrollView>
  )
}

export default Container

const styles = StyleSheet.create({})