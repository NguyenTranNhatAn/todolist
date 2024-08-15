import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Router from './src/routers/Router'


const App = () => {
  return (
  <>
    <SafeAreaView style={{flex:1}}>
      <StatusBar
        
        barStyle={'light-content'}
        backgroundColor={'black'} />
     <NavigationContainer>
      <Router/>
     </NavigationContainer>
    </SafeAreaView>
  </>
  )
}

export default App