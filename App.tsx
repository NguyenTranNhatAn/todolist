import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.tilte}>Todo List</Text>
    </View>
  )
}

export default App
const styles =StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'coral',
    justifyContent:'center',
    alignItems:'center'
  },
  tilte:{
    fontWeight:'700',
    fontSize:32,
    color:'#fff'

  }
})