import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import HomeScreen from './src/home/HomeScreen'
import { SafeAreaView } from 'react-native'


const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar
        
        barStyle={'light-content'}
        backgroundColor={'black'} />
      <HomeScreen />
    </SafeAreaView>
  )
}

export default App