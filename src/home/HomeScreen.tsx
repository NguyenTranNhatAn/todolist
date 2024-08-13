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
import { Element4, Notification, SearchNormal1 } from 'iconsax-react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TagComponent from '../components/TagComponent'
import SpaceComponent from '../components/SpaceComponent'
const HomeScreen = () => {
  return (
    <Container>
      <SectionComponent>
        <RowComponent justify='space-between'>
          <Element4 size={24} color={colors.desc} />
          <Notification size={24} color={colors.desc} />

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
        } onPress={() => console.log('helo')} >
          <TextComponent color='#696b6f' text='Search task' />
          <SearchNormal1 size={20} color={colors.desc}/>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <CardComponent>
          <RowComponent>
            <View style={{ flex: 1 }}>
              <TitleComponent text='Task Progress' />
              <TextComponent text='30/40 tasks done' />
              <SpaceComponent height={12}/>
             <RowComponent justify='flex-start'>
             <TagComponent onPress={()=>console.log('sayhi')} text='Match 22'/>
             </RowComponent>
            </View>
            <View >
              <TextComponent text='abc' />
            </View>

          </RowComponent>
        </CardComponent>
      </SectionComponent>
    </Container>
  )
}

export default HomeScreen