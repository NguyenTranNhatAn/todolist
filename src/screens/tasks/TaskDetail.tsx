import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import { globalStyle } from '../../style/globalStyle';
import SectionComponent from '../../components/SectionComponent';
import TextComponent from '../../components/TextComponent';
import { StatusBar } from 'react-native';
import RowComponent from '../../components/RowComponent';
import { AddSquare, ArrowLeft2, CalendarEdit, Clock, DocumentUpload, TickCircle } from 'iconsax-react-native';
import { colors } from '../../constants/colors';
import firestore from '@react-native-firebase/firestore'
import { TaskModel } from '../../models/TaskModel';
import TitleComponent from '../../components/TitleComponent';
import SpaceComponent from '../../components/SpaceComponent';
import AvataGroup from '../../components/AvataGroup';
import { HandleDateTime } from '../../utils/handleDateTime';
import CardComponent from '../../components/CardComponent';
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { fontFamily } from '../../constants/fontFamilies';
const TaskDetail = ({ navigation, route }: any) => {
  const { id, color }: { id: string, color?: string } = route.params;
  const [TaskDetail, setTaskDetail] = useState<TaskModel>();
  useEffect(() => {
    getTaskDetail()
  }, [])

  const getTaskDetail = () => {
    firestore().doc(`tasks/${id}`).onSnapshot((snap: any) => {
      if (snap.exists) {
        setTaskDetail({
          id,
          ...snap.data()
        })
      }
      else {
        console.log('Task detail not found')
      }

    })
  }

  return TaskDetail ? (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bgcolor }}>
      <StatusBar backgroundColor={'transparent'} translucent />
      <SectionComponent styles={{
        backgroundColor: color ?? 'rgba(113,77,217,0.9)',
        paddingVertical: 20,
        paddingTop: 42,
        paddingBottom: 18,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

      }}>
        <RowComponent >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size={26} color={colors.text} />
          </TouchableOpacity>
          <SpaceComponent width={12} />
          <TitleComponent size={22} flex={1} styles={{
            paddingTop: 6,
            lineHeight: 25, marginBottom: 0
          }}
            text={TaskDetail.title} />
        </RowComponent>
        <SpaceComponent height={30} />
        <TextComponent text='Due date' />
        <RowComponent>
          <RowComponent styles={{ flex: 1 }}>
            <Clock size={18} color={colors.text} />
            <SpaceComponent width={8} />
            <TextComponent text={`${HandleDateTime.GetHour(TaskDetail.start.toDate())

              } -${HandleDateTime.GetHour(TaskDetail.end.toDate())}`} />
          </RowComponent>
          <RowComponent styles={{ flex: 1 }}>
            <CalendarEdit size={18} color={colors.text} />
            <SpaceComponent width={8} />
            <TextComponent text={`${HandleDateTime.DateString(TaskDetail.dueDate.toDate())}`} />
          </RowComponent>
          <RowComponent justify='flex-end' styles={{ flex: 1 }}>
            <AvataGroup uids={TaskDetail.uids} />
          </RowComponent>

        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <TitleComponent text='Description' size={12} />
        <CardComponent
          styles={{
            marginTop: 10,
            borderWidth: 1,
            borderColor: colors.gray,
            borderRadius: 20
          }}
          bgColor={colors.bgcolor}>
          <TextComponent text={TaskDetail.description} />

        </CardComponent>
      </SectionComponent>
      <SectionComponent>
        <CardComponent>
          <RowComponent>
            <TextComponent flex={0} text='Files and links' />
            <RowComponent styles={{ flex: 1 }}>
              <Ionicons style={[globalStyle.documentImg]} name='document-text' size={38} color='#0263d1' />
              <AntDesign style={[globalStyle.documentImg]} name='pdffile1' size={35} color='#e5252a' />
              <MaterialCommunityIcons name='file-excel' size={42} color='#00733b' />
              <AntDesign name='addfile' style={[globalStyle.documentImg]} size={30} color={colors.white} />
            </RowComponent>
          </RowComponent>
        </CardComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent>
          <View style={{
            width: 24, height: 24,
            borderRadius: 100,
            borderWidth: 2,
            marginRight: 4,
            borderColor: colors.success,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              backgroundColor: colors.success,
              width: 16,
              height: 16,
              borderRadius: 100,
            }}>

            </View>
          </View>
          <TextComponent flex={1} font={fontFamily.bold} size={18} text='Progress' />
        </RowComponent>
        <SpaceComponent height={12} />
        <RowComponent>
          <View style={{ flex: 1 }}>
            <TextComponent text='Slide' />
          </View>
          <TextComponent
            text='`70%'
            font={fontFamily.bold}
            size={18}
            flex={0}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent>
        <TitleComponent flex={1} text='Sub Tasks' size={20} />
        <TouchableOpacity>
          <AddSquare size={22} color={colors.success} variant='Bold'/>
        </TouchableOpacity>
        </RowComponent>
       
        {
          Array.from({ length: 3 }).map((item, index) => <CardComponent key={`subTask${index}`}>
          <RowComponent>
            <TickCircle variant='Bold' size={22} color={colors.success}/> 
            <SpaceComponent width={12}/>
            <TextComponent text='ddd'/>
          </RowComponent>
          </CardComponent>)
        }
      </SectionComponent>
    </ScrollView>
  )
    : <></>
}

export default TaskDetail