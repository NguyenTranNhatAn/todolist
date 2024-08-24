import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyle } from '../../style/globalStyle';
import SectionComponent from '../../components/SectionComponent';
import TextComponent from '../../components/TextComponent';
import { StatusBar } from 'react-native';
import RowComponent from '../../components/RowComponent';
import { AddSquare, ArrowLeft2, CalendarEdit, Clock, DocumentUpload, TickCircle, TickSquare } from 'iconsax-react-native';
import { colors } from '../../constants/colors';
import firestore from '@react-native-firebase/firestore'
import { Attachment, SubStatModel, TaskModel } from '../../models/TaskModel';
import TitleComponent from '../../components/TitleComponent';
import SpaceComponent from '../../components/SpaceComponent';
import AvataGroup from '../../components/AvataGroup';
import { HandleDateTime } from '../../utils/handleDateTime';
import CardComponent from '../../components/CardComponent';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { fontFamily } from '../../constants/fontFamilies';
import { Slider } from '@miblanchard/react-native-slider';
import ButtonComponent from '../../components/ButtonComponent';
import UploadFileComponent from '../../components/UploadFileComponent';
import { calcFileSize } from '../../utils/calcFileSize';
import ModalAddSubTask from '../../modals/ModalAddSubTask';
const TaskDetail = ({ navigation, route }: any) => {
  const { id, color }: { id: string, color?: string } = route.params;
  const [TaskDetail, setTaskDetail] = useState<TaskModel>();
  const [progress, setProgress] = useState(0);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [subTask, setSubTask] = useState<SubStatModel[]>([]);
  const [ischange, setIschange] = useState(false);
  const [isVisibleSubTask, setIsVisibleSubTask] = useState(false);
  const [isUrgent, setisUrgent] = useState(false)
  useEffect(() => {
    getTaskDetail()
    getSubTabById()
  }, [id])

  useEffect(() => {
    if (TaskDetail) {
      setProgress(TaskDetail.progress ?? 0)
      setAttachments(TaskDetail.attachments)
      setisUrgent(TaskDetail.isUrgent)

    }
  }, [TaskDetail])

  useEffect(() => {
    if
      (progress !== TaskDetail?.progress || attachments.length !== TaskDetail.attachments.length) {
      setIschange(true)
    }
    else {
      setIschange(false)
    }
  }, [progress, TaskDetail, attachments])




  useEffect(() => {
    if (subTask.length > 0) {
      const completedPercent = (subTask.filter(element => element.isComplete)).length / subTask.length

      setProgress(completedPercent);
    }
  }, [subTask])

  const handleUpdateUrgent = () => {
    firestore()
      .doc(`tasks/${id}`)
      .update({
        isUrgent: !isUrgent,
        updatedAt: Date.now()
      })
  }
  const handleUpdate = async () => {
    const data = { ...TaskDetail, progress, attachments, updateAt: Date.now() }
    await firestore().doc(`tasks/${id}`).update(data).then(() => {
      Alert.alert('Task updated')
    }).catch(error => console.log(error))

  }

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

  const getSubTabById = () => {
    firestore().collection('subTasks').where('taskId', '==', id).onSnapshot(snap => {
      if (snap.empty) {
        // console.log('Data not found')
      }
      else {
        const items: SubStatModel[] = [];
        snap.forEach((item: any) => {
          items.push({
            id: item.id,
            ...item.data()
          })
        })
        setSubTask(items)
      }
    })

  }

  const handleUpdateSubTask = async (id: string, isComplete: boolean) => {
    try {
      await firestore().doc(`subTasks/${id}`).update({ isComplete: !isComplete })
    } catch (error) {
      console.log(error);
    }
  }

  return TaskDetail ? (
    <>
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
            <TitleComponent line={1} size={22} flex={1} styles={{
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
          <RowComponent onPress={handleUpdateUrgent}>
            <TickSquare variant={isUrgent ? 'Bold' : 'Outline'} style={{ marginRight: 10 }} size={24} color={colors.white} />
            <TextComponent size={18} font={fontFamily.bold} text={'Is Urgent'} />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent>
            <TitleComponent flex={1} text='Files and links' />
            <TouchableOpacity>
              <UploadFileComponent onUpload={file => file && setAttachments([...attachments, file])} />
            </TouchableOpacity>
          </RowComponent>
          {attachments.map((item, index) => <View key={`attachment${index}`}
            style={{
              justifyContent: 'flex-start', marginBottom: 8,
            }}>
            <TextComponent flex={0} text={item.name} />
            <TextComponent size={12} flex={0} text={calcFileSize(item.size)} />
          </View>)}
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
              <Slider
                disabled
                value={progress}
                thumbStyle={{
                  borderWidth: 2,
                  borderColor: colors.white
                }}
                onValueChange={val => setProgress(val[0])}
                thumbTintColor={colors.success}
                maximumTrackTintColor={colors.gray2}
                minimumTrackTintColor={colors.success}
                containerStyle={{ height: 10, borderRadius: 100 }}
              />
            </View>
            <SpaceComponent width={20} />
            <TextComponent
              text={`${Math.floor(progress * 100)}%`}
              font={fontFamily.bold}
              size={18}
              flex={0}
            />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent>
            <TitleComponent flex={1} text='Sub Tasks' size={20} />
            <TouchableOpacity onPress={() => { setIsVisibleSubTask(true) }}>
              <AddSquare size={22} color={colors.success} variant='Bold' />
            </TouchableOpacity>
          </RowComponent>
          {
            subTask.length > 0 &&

            subTask.map((item, index) => <CardComponent styles={{ marginBottom: 12 }} key={`subTask${index}`}>
              <RowComponent onPress={() => handleUpdateSubTask(item.id, item.isComplete)}>
                <TickCircle variant={item.isComplete ? 'Bold' : 'Outline'} size={22} color={colors.success} />
                <SpaceComponent width={10} />
                <View style={{ flex: 1, marginLeft: 12 }}>

                  <TextComponent text={item.title} />
                  <TextComponent size={12} color='#e0e0e0' text={HandleDateTime.DateString(item.createAt)} />
                </View>
              </RowComponent>
            </CardComponent>)
          }


        </SectionComponent>
      </ScrollView>
      {
        ischange &&
        <View style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          left: 20,
        }}>
          <ButtonComponent text='Update' onPress={() => handleUpdate()} />
        </View>
      }
      <ModalAddSubTask taskId={id} visible={isVisibleSubTask} onClose={() => setIsVisibleSubTask(false)} />
    </>
  )
    : <></>
}

export default TaskDetail