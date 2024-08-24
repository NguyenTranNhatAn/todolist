import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container';
import TextComponent from '../../components/TextComponent';

import TitleComponent from '../../components/TitleComponent';
import SectionComponent from '../../components/SectionComponent';
import InputComponent from '../../components/InputComponent';
import { SearchNormal } from 'iconsax-react-native';
import { colors } from '../../constants/colors';
import { TaskModel } from '../../models/TaskModel';
import { replaceName } from '../../utils/replaceText';

const ListTask = ({ navigation, route }: any) => {
  const { tasks }: { tasks: TaskModel[] } = route.params;
  const [searchKey, setSearchKey] = useState('');
  const [result, setResult] = useState<TaskModel[]>([])
  useEffect(() => {
    if (!searchKey) {
      setResult([])
    }
    else {
      const items = tasks.filter(element => element.title.toLowerCase().includes(replaceName(searchKey.toLocaleLowerCase())));
      setResult(items);
    }
  }, [searchKey])
  return (
    <Container back>
      <SectionComponent>
        <InputComponent allowClear
          prefix={<SearchNormal size={20} color={colors.gray2} />}
          placeholder='Search'
          value={searchKey}
          onChange={val => setSearchKey(val)} />
      </SectionComponent>
      <FlatList
        ListEmptyComponent={<SectionComponent><TextComponent text='Data not found!!!' /></SectionComponent>}
        showsVerticalScrollIndicator={false}
         data={searchKey?result:tasks} 
         renderItem={({ item }) =>
          <TouchableOpacity
            style={{
              flex: 1,
              marginBottom: 24,
              paddingHorizontal: 16,
            }}
            onPress={() => navigation.navigate('TaskDetail', { id: item.id })}
            key={item.id}
          >
            <TitleComponent text={item.title} />
            <TextComponent text={item.description} line={3} />
          </TouchableOpacity>} />
    </Container>
  )
}

export default ListTask