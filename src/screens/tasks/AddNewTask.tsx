import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import Container from '../../components/Container'
import TextComponent from '../../components/TextComponent'
import { TaskModel } from '../../models/TaskModel'
import SectionComponent from '../../components/SectionComponent'
import InputComponent from '../../components/InputComponent'
import { User } from 'iconsax-react-native'
import { colors } from '../../constants/colors'
import DateTimePickerComponent from '../../components/DateTimePickerComponent'
import RowComponent from '../../components/RowComponent'
import SpaceComponent from '../../components/SpaceComponent'
const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  color: '',
  fileUrls: []
}
const AddNewTask = () => {
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);
  const handleChangeValue = (id: string, value: string | Date) => {
    const item: any = { ...taskDetail }
    item[`${id}`] = value;
    setTaskDetail(item)
  };
  const handleAddNewTask = async () => {
    console.log(taskDetail)
  }
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
      </SectionComponent>
      <SectionComponent>
        <Button title='save' onPress={handleAddNewTask} />
      </SectionComponent>

    </Container>
  )
}

export default AddNewTask