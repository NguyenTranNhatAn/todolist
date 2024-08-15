import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Router from './src/routers/Router'
import { colors } from './src/constants/colors'


const App = () => {
  return (
  <>
    <SafeAreaView style={{flex:1}}>
    <StatusBar barStyle="light-content" backgroundColor={colors.bgcolor} />
     <NavigationContainer>
      <Router/>
     </NavigationContainer>
    </SafeAreaView>
  </>
  )
}

export default App