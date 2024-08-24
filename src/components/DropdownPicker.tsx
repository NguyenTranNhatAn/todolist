import { View, Text, Modal, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SelectModel } from '../models/SelectModel';
import TitleComponent from './TitleComponent';
import RowComponent from './RowComponent';
import { globalStyle } from '../style/globalStyle';
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';
import { ArrowDown, ArrowDown2, SearchNormal1, TickCircle } from 'iconsax-react-native';
import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SpaceComponent from './SpaceComponent';
interface Props {
  title?: string,
  items: SelectModel[],
  selected?: string[],
  onSelect: (val: string[]) => void,
  multible?: boolean
}
const DropdownPicker = (props: Props) => {
  const {
    title,
    items,
    selected,
    onSelect,
    multible
  } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [results, setResults] = useState<SelectModel[]>([]);
  const [dataSelected, setdataSelected] = useState<string[]>([]);
  useEffect(() => {
    selected && setdataSelected(selected)
  }, [isVisible, selected])
  useEffect(() => {
    if (!searchKey) {
      setResults([])
    }
    else {
      const data = items.filter(element => (element.label.toLocaleLowerCase()).includes(searchKey.toLocaleLowerCase()))
      setResults(data);
    }
  }, [searchKey]);
  const handleSelectedItem = (id: string) => {
    if (multible) {

      const data = [...dataSelected];
      const index = data.findIndex(element => element === id);

      if (index !== -1) {
        data.splice(index, 1);
      } else {
        data.push(id);
      }

      setdataSelected(data);


    } else {
      setdataSelected([id])
    }
  }
  const handleConfirmSelect = () => {
    onSelect(dataSelected)
    setIsVisible(false)
    setdataSelected([])
  }
  const renderSelectedItem = (id: string, index: number) => {
    const item = items.find(element => element.value === id)

    return item &&
      <RowComponent onPress={() => removeSelectedItem(index)} styles={{
        marginRight: 4,
        padding: 4,
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: colors.gray2,
        marginBottom: 6
      }} key={id}>
        <TextComponent flex={0} text={item.label} />
        <SpaceComponent width={8} />
        <AntDesign name='close' size={14} color={colors.text} />
      </RowComponent>
  }
  const removeSelectedItem = (index: number) => {
   if(selected){
    selected?.splice(index, 1)
    onSelect(selected)
   }
  }
  return (
    <View style={{ marginBottom: 16 }}>
      {title && <TitleComponent text={title} />}
      <RowComponent onPress={() => setIsVisible(true)} styles={[globalStyle.inputContainer, {
        marginTop: title ? 8 : 0,
        paddingVertical: 14,
        flexWrap: 'wrap'
      }
      ]}>
        <View style={{ flex: 1 }}>
          {
            selected && selected?.length > 0 ? <RowComponent justify='flex-start'>
              {selected.map((id, index) => renderSelectedItem(id, index))}
            </RowComponent>
              : <TextComponent text='Select' flex={0} color={colors.gray2} />
          }

        </View>
        <ArrowDown2 size={22} color={colors.text} />
      </RowComponent>
      <Modal visible={isVisible} transparent animationType='slide' style={{ flex: 1, }}>
        <View style={[globalStyle.container, {
          padding: 20,
          paddingVertical: 50,

        }]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<RowComponent>
              <View style={{ flex: 1 }}>
                <InputComponent
                  value={searchKey}
                  allowClear
                  placeholder='Search..'
                  prefix={<SearchNormal1 size={20} color={colors.gray2} />}
                  onChange={val => setSearchKey(val)} />
              </View>
              <TouchableOpacity style={{
                justifyContent:'center',
                alignItems:'center',
                marginLeft:10
              }} onPress={() => { setIsVisible(false), setdataSelected([]) }}>
                <TextComponent flex={0} text='Cancel' color='coral' />
              </TouchableOpacity>
            </RowComponent>}
            style={{ flex: 1 }}
            data={searchKey ? results : items}
            renderItem={({ item }) => 
            (
              <RowComponent onPress={() => handleSelectedItem(item.value)} styles={{
                paddingVertical: 16,
              }}>
                <TextComponent text={item.label} key={item.value} color={dataSelected.includes(item.value) ? 'coral' : colors.text} />
                {
                  dataSelected.includes(item.value) && <TickCircle size={22} color='coral' />

                }
              </RowComponent>
            )
            }


          />
          <ButtonComponent text='Confirm' onPress={() => handleConfirmSelect()} />
        </View>
      </Modal>
    </View>
  )
}

export default DropdownPicker