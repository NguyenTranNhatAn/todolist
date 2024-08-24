import { View, Text, Button, Platform, PermissionsAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import TextComponent from '../../components/TextComponent'
import { Attachment, TaskModel } from '../../models/TaskModel'
import SectionComponent from '../../components/SectionComponent'
import InputComponent from '../../components/InputComponent'
import { AttachSquare, User } from 'iconsax-react-native'
import { colors } from '../../constants/colors'
import DateTimePickerComponent from '../../components/DateTimePickerComponent'
import RowComponent from '../../components/RowComponent'
import SpaceComponent from '../../components/SpaceComponent'
import DropdownPicker from '../../components/DropdownPicker'
import { SelectModel } from '../../models/SelectModel'
import firestore from '@react-native-firebase/firestore'
import ButtonComponent from '../../components/ButtonComponent'
import TitleComponent from '../../components/TitleComponent'
import storage from '@react-native-firebase/storage'
import DocumentPicker, { DocumentPickerOptions, DocumentPickerResponse } from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob'
import UploadFileComponent from '../../components/UploadFileComponent'
import { fontFamily } from '../../constants/fontFamilies'
import auth from '@react-native-firebase/auth'

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate:undefined,
  start: undefined,
  end: undefined,
  uids: [],
  attachments: [],
  createAt: Date.now(),
  updateAt: Date.now(),
  isUrgent:false
}


const AddNewTask = ({ navigation, route }: any) => {

  const { editable, task }: { editable: Boolean, task?: TaskModel } = route.params;
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);
  const [usersSelect, setUsersSelect] = useState<SelectModel[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const [byteTransferented, setByteTransferented] = useState(0)


  const user = auth().currentUser;


  useEffect(() => {

    if (Platform.OS === 'android') {

      PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES])
    }

  }, [])
  useEffect(() => {
    handleGetAllUsers();
  }, [])

  useEffect(() => {
    user && setTaskDetail({ ...taskDetail, uids: [user.uid] })
  }, [user])

  useEffect(() => {
    
    task &&
      setTaskDetail({
        ...taskDetail,
        title: task.title,
        description:task.description,
        uids:task.uids
      })
  
      
  }, [task])
  const handleGetAllUsers = async () => {

    await firestore().collection('users').get().then(snap => {
      if (snap.empty) {
        console.log('Users data not found')
      } else {
        const items: SelectModel[] = []
        snap.forEach(item => {
          items.push({
            label: item.data().displayName,
            value: item.id
          })

        }
        )
        setUsersSelect(items)
      }
    }).catch(error => {
      console.log(`Cannot get users,${error.message}`)
    })
  }

  const handleChangeValue = (id: string, value: string | Date | string[]) => {
    const item: any = { ...taskDetail }
    item[`${id}`] = value;
    setTaskDetail(item)
  };
  const handleAddNewTask = async () => {
    if (user) {

      const data = {
        ...taskDetail,
        attachments,
        createAt:task?task.createAt:Date.now(),
        updateAt:Date.now()
      }
      console.log(data)
      if (task) {
        await firestore().doc(`tasks/${task.id}`).update(data).then(()=>{
          console.log('update')
          navigation.goBack()
        })
      }
      else{

        await firestore().collection('tasks').add(data).then(() => {
          console.log('thanhcong')
          navigation.goBack()
        }).catch(error => console.log(error))
      }
    
    } else {
      Alert.alert('You not login!!')
    }
  }

  // console.log(attachmentUrl)
  return (
    <Container back title='add'>
      <SectionComponent>
        <InputComponent
          onChange={val => handleChangeValue('title', val)}
          value={taskDetail.title}
          title='Title'
          allowClear
          placeholder='Title of task' />
        <InputComponent
          onChange={val => handleChangeValue('description', val)}
          value={taskDetail.description}
          title='Description'
          allowClear
          multible
          numberofLine={3}
          placeholder='Content' />

        <DateTimePickerComponent
          selected={taskDetail.dueDate}
          placeholder='Choice'
          type='date'
          title='Due Date'
          onSelect={val => handleChangeValue('dueDate', val)} />

        <RowComponent>
          <View style={{ flex: 1 }}>
            <DateTimePickerComponent
              onSelect={val => handleChangeValue('start', val)}
              title='Start'
              type='time'
              selected={taskDetail.start} />
          </View>
          <SpaceComponent width={14} />
          <View style={{ flex: 1 }}>
            <DateTimePickerComponent
              onSelect={val => handleChangeValue('end', val)}
              title='End'
              type='time'
              selected={taskDetail.end} />
          </View>

        </RowComponent>
        <DropdownPicker
          selected={taskDetail.uids}
          items={usersSelect}
          multible
          onSelect={val => handleChangeValue('uids', val)}
          title='Members' />
        <View>
          <RowComponent styles={{
            alignItems: 'center',
            justifyContent: 'flex-start',

          }}  >

            <TextComponent size={16} font={fontFamily.bold} flex={0} text='Attachments' />
            <SpaceComponent width={8} />
            <UploadFileComponent onUpload={file => file && setAttachments([...attachments, file])} />
          </RowComponent>
          {
            attachments.length > 0 && attachments.map((item, index) =>
              <RowComponent styles={{ paddingVertical: 12 }} key={`attachment${index}`}>
                <TextComponent text={item.name ?? ''} />
              </RowComponent>
            )
          }
        </View>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent text={task?'Update':'Save'} onPress={() => handleAddNewTask()} />
      </SectionComponent>

    </Container>
  )
}

export default AddNewTask