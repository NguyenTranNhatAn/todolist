 import { View, Text } from 'react-native'
 import React, { ReactNode } from 'react'
import { globalStyle } from '../style/globalStyle';
 interface Props{
children:ReactNode
 }
 const SectionComponent = (props:Props) => {
    const {children}=props;
   return (
     <View style={[globalStyle.section]}>
      {children}
     </View>
   )
 }
 
 export default SectionComponent