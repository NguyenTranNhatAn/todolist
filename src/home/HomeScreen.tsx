import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
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
import { Add, Edit2, Element4, Notification, SearchNormal1 } from 'iconsax-react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TagComponent from '../components/TagComponent'
import SpaceComponent from '../components/SpaceComponent'
import CicularComponent from '../components/CicularComponent'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import CardImageComponent from '../components/CardImageComponent'
import AvataGroup from '../components/AvataGroup'
import ProgressBar from '../components/ProgressBarComponent'
import ProgressBarComponet from '../components/ProgressBarComponent'
const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
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
            <SearchNormal1 size={20} color={colors.desc} />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <CardComponent>
            <RowComponent>
              <View style={{ flex: 1 }}>
                <TitleComponent text='Task Progress' />
                <TextComponent text='30/40 tasks done' />
                <SpaceComponent height={12} />
                <RowComponent justify='flex-start'>
                  <TagComponent onPress={() => console.log('sayhi')} text='Match 22' />
                </RowComponent>
              </View>
              <View >
                <CicularComponent color={colors.blue} value={80} />
              </View>

            </RowComponent>
          </CardComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent styles={{ alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              <CardImageComponent>
                <TouchableOpacity style={[
                  globalStyle.iconContainer
                ]}
                >
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponent size={18} text='UX Design' />
                <TextComponent text='Task managament mobile apps' size={13} />
                <View style={{ marginVertical: 24 }}>
                  <AvataGroup />
                  <ProgressBarComponet percent='70%' color={'#0aacff'} size='large' />
                </View>
                <TextComponent
                  size={12}
                  color={colors.desc}
                  text='Due, 2023 Match 04' />
              </CardImageComponent>
            </View>
            <SpaceComponent width={16} />
            <View style={{ flex: 1, }}>
              <CardImageComponent color='rgba(33,150,243,0.9)'>
                <TouchableOpacity style={[
                  globalStyle.iconContainer
                ]}
                >
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponent size={18} text='Api Payment' />
                <AvataGroup />
                <ProgressBarComponet percent='40%' color={'#a2f068'} />
              </CardImageComponent>
              <SpaceComponent height={16} />
              <CardImageComponent color='rgba(18,181,122,0.9)'>
                <TouchableOpacity style={[
                  globalStyle.iconContainer
                ]}
                >
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponent size={18} text='Update work' />
                <TextComponent text='Redivion home page' size={13} />


              </CardImageComponent>
            </View>
          </RowComponent>
        </SectionComponent>
        <SpaceComponent height={16} />
        <SectionComponent>
          <TitleComponent
            font={fontFamily.bold}
            size={21}
            text='Urgents tasks' />
          <CardComponent>
            <RowComponent>
              <CicularComponent radius={36} value={80} />
              <View style={{
                flex: 1,
                justifyContent: 'center',
                paddingLeft: 12,
              }}>
                <TextComponent text='nhâtna' />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>

      </Container>
      <View style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'

      }}>
        <TouchableOpacity
        activeOpacity={1}
          style={[
            globalStyle.row,
            {
              backgroundColor: colors.blue,
              padding: 10,
              borderRadius: 100,
              width: '80%',

            }
          ]}>
          <TextComponent text='New Task' flex={0} />
          <Add size={22} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen