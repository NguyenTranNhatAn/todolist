import { View, Text, Button, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import TextComponent from '../../components/TextComponent'
import { TaskModel } from '../../models/TaskModel'
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

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  attachments: [],
}


const AddNewTask = ({ navigation }: any) => {
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);
  const [usersSelect, setUsersSelect] = useState<SelectModel[]>([]);
  const [attachments, setAttachments] = useState<DocumentPickerResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [byteTransferented, setByteTransferented] = useState(0)
  const [attachmentUrl, setAttachmentUrl] = useState<string[]>([]);

  useEffect(() => {

    if (Platform.OS === 'android') {

      PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES])
    }

  }, [])
  useEffect(() => {
    handleGetAllUsers();
  }, [])

  const handleGetAllUsers = async () => {
    await firestore().collection('users').get().then(snap => {
      if (snap.empty) {
        console.log('Users data not found')
      } else {
        const items: SelectModel[] = []
        snap.forEach(item => {
          items.push({
            label: item.data().name,
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
    const data = {
      ...taskDetail,
      fileUrls: attachmentUrl
    }
    await firestore().collection('tasks').add(data).then(() => {
      console.log('thanhcong')
      navigation.goBack()
    }).catch(error => console.log(error))
  }
  const handlePickerDocument = () => {
    DocumentPicker.pick({
    }).then(res => {
      setAttachments(res)
      res.forEach(item => {
        handleUploadFiletoStorage(item)
      })
    }).catch(error => {
      console.log(error);
    })
  }
  const getPath = async (file: DocumentPickerResponse) => {
    if (Platform.OS === 'ios') {
      return file.uri;
    }
    else {

      return (await RNFetchBlob.fs.stat(file.uri)).path
    }
  }
  const handleUploadFiletoStorage = async (item: DocumentPickerResponse) => {

    const fileName = item.name ?? `file${Date.now()}`
    console.log(item)
    const path = `documents/${fileName}`;
    const items = [...attachmentUrl]
    const uri = await getPath(item);
    const res = storage().ref(path).putFile(uri);
    console.log(uri)
    res.on('state_changed', snap => {
      setStatus(snap.state);
      setByteTransferented(snap.bytesTransferred);
    }, (error) => {
      console.log(error)
    }, () => {
      //get download url
      storage().ref(path).getDownloadURL().then(url => {

        setAttachmentUrl(items)
      })
    })
    await storage().ref(path).getDownloadURL().then(url => {
      items.push(url)
      setAttachmentUrl(items)
    }).catch(error => {
      console.log(error)
    })
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
          <RowComponent onPress={handlePickerDocument} justify='flex-start'>

            <TitleComponent flex={0} text='Attachments' />
            <SpaceComponent width={8} />
            <AttachSquare size={20} color={colors.white} />
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
        <ButtonComponent text='save' onPress={() => handleAddNewTask()} />
      </SectionComponent>

    </Container>
  )
}

export default AddNewTask