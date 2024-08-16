import { View, Text, Modal, Button, Dimensions } from 'react-native'
import React, { useState } from 'react'
import TitleComponent from './TitleComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';
import { ArrowDown, ArrowDown2 } from 'iconsax-react-native';
import { globalStyle } from '../style/globalStyle';
import SpaceComponent from './SpaceComponent';
import DatePicker from 'react-native-date-picker';
interface Props {
    type?: 'date' | 'time' | 'datetime',
    title?: string,
    placeholder?: string,
    selected?: Date,
    onSelect: (val: Date) => void
}
const DateTimePickerComponent = (props: Props) => {
    const { type, title, placeholder, selected, onSelect } = props;
    const [isVisibleModalDateTime, setIsVisibleModalDateTime] = useState(false);
    const [date, setDate] = useState(selected ?? new Date());
    return (
        <>
            <View style={{ marginBottom: 16 }}>
                {title && <TitleComponent flex={0} text={title} />}
                <RowComponent onPress={() => setIsVisibleModalDateTime(true)} styles={[globalStyle.inputContainer, {
                    marginTop: title ? 8 : 0
                }]}>
                    <TextComponent
                        flex={1}
                        color={selected ? colors.text : '#676767'}
                        text={
                            selected
                                ? type==='time'? `${selected.getHours()}:${selected.getMinutes()}` : `${selected.getDate()}/${selected.getMonth() + 1}/${selected.getFullYear()}`
                                : placeholder
                                    ? placeholder
                                    : ''} />
                    <ArrowDown2 size={20} color={colors.text} />
                </RowComponent>
            </View>
            <Modal visible={isVisibleModalDateTime} transparent animationType='slide'>
                <View style={{
                    flex: 1,
                    justifyContent:
                        'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    <View
                        style={{
                            margin: 20, width: '90%',
                            backgroundColor: colors.white,
                            padding: 20,
                            borderRadius: 20
                        }}>
                        <View>
                            <DatePicker
                                date={date}
                                onDateChange={val => setDate(val)}
                                locale='vi'
                                mode={type ? type : 'datetime'} />
                        </View>
                        <SpaceComponent height={20} />
                        <Button title='Comfirm' onPress={() => {
                            onSelect(date)
                            setIsVisibleModalDateTime(false)
                        }} />
                        <Button title='Close' onPress={() => setIsVisibleModalDateTime(false)} />
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default DateTimePickerComponent