import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../style/globalStyle';
import RowComponent from '../components/RowComponent';
import TextComponent from '../components/TextComponent';
import ButtonComponent from '../components/ButtonComponent';
import { colors } from '../constants/colors';
import TitleComponent from '../components/TitleComponent';
import InputComponent from '../components/InputComponent';
import firestore from '@react-native-firebase/firestore'
interface Props {
  visible: boolean,
  subTask?: any,
  onClose: () => void,
  taskId: string
}
const initValue = {
  title: '',
  description: '',
  isComplete: false
}
const ModalAddSubTask = (props: Props) => {

  const { visible, subTask, onClose, taskId } = props;
  const [subTaskForm, setSubTaskForm] = useState(initValue);
  const [isLoading, setisLoading] = useState(false)
  const handleCloseModal = () => {
    setSubTaskForm(initValue);
    onClose();
  }
  const handleSavetoDataBase =  async() => {
    const data ={
      ...subTaskForm,
      createdAt: Date.now(),
      upDatedAt: Date.now(),
      taskId,

    }
    setisLoading(true)
    await firestore().collection('subTasks').add(data)
    console.log('Done');
    handleCloseModal();
   setisLoading(false)
  }
  return (
    <Modal statusBarTranslucent visible={visible} style={globalStyle.modal} transparent animationType='slide'>
      <View style={[globalStyle.modalContainer]}>
        <View style={[globalStyle.modalContent, {
          backgroundColor: colors.bgcolor
        }]}>
          <TitleComponent text='Add new sub task' />
          <View style={{ paddingVertical: 16, }}>
            <InputComponent
              allowClear
              title='Title'
              placeholder='Title'
              onChange={val => setSubTaskForm({
                ...subTaskForm,
                title: val,
              })}
              value={subTaskForm.title} />
            <InputComponent
              title='Description'
              placeholder='Description'
              onChange={val => setSubTaskForm({
                ...subTaskForm,
                description: val,
              })}
              numberofLine={3}
              multible
              value={subTaskForm.description} />
          </View>
          <TextComponent text='fafaf' />
          <RowComponent>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => handleCloseModal()}>
                <TextComponent flex={0} text='Close' />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <ButtonComponent isLoading={isLoading} text='Save' onPress={() => { handleSavetoDataBase()}} />
            </View>

          </RowComponent>
        </View>
      </View>
    </Modal>
  )
}

export default ModalAddSubTask