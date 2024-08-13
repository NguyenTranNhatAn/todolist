import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Container from '../components/Container'
import { globalStyle } from '../style/globalStyle'
import RowComponent from '../components/RowComponent'
import SectionComponent from '../components/SectionComponent'
import TextComponent from '../components/TextComponent'
import { fontFamily } from '../constants/fontFamilies'
import TitleComponent from '../components/TitleComponent'
import { colors } from '../constants/colors'
import CardComponent from '../components/CardComponent'

const HomeScreen = () => {
  return (
    <Container>
      <SectionComponent>
        <RowComponent justify='space-between'>
          <TextComponent text='' />
          <TextComponent text='' />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <TextComponent text='Hi, Json' />
        <TitleComponent
          text='Let Productive Today'
        />
      </SectionComponent>
      <SectionComponent>
        <RowComponent styles={
        [globalStyle.inputContainer]
        } onPress={()=>console.log('helo')} >
           <TextComponent text='Search' />
           <Text>1</Text>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <CardComponent>
          <RowComponent>
            <View style={{flex:1}}>
              <TitleComponent text='Task Progress'/>
              <TextComponent text='30/40 tasks done'/>
              <TextComponent text='Tag Component'/>
            </View>
            <View >
              <TextComponent text='abc'/>
            </View>
            
          </RowComponent>
        </CardComponent>
      </SectionComponent>
    </Container>
  )
}

export default HomeScreen