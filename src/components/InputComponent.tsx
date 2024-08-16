import { View, Text, TextInput, Touchable, TouchableOpacity, Button } from 'react-native'
import React, { ReactNode } from 'react'
import TitleComponent from './TitleComponent'
import RowComponent from './RowComponent'
import { globalStyle } from '../style/globalStyle'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../constants/colors'
import SectionComponent from './SectionComponent'
interface Props {
    value: string,
    onChange: (val: string) => void,
    placeholder?: string,
    title?: string,
    prefix?: ReactNode,
    affix?: ReactNode,
    allowClear?: boolean,
    multible?: boolean,
    numberofLine?: number,
}
const InputComponent = (props: Props) => {
    const { value, onChange, placeholder, title, prefix, affix, allowClear, multible, numberofLine } = props;

    return (
        <View style={{ marginBottom: 16, }}>
            {title && <TitleComponent flex={0} text={title} />}
            <RowComponent styles={[globalStyle.inputContainer, {
                marginTop: title ? 4 : 0,
                minHeight: multible && numberofLine ?32 *numberofLine:40,
                paddingVertical:multible && numberofLine?10:0,
                padding:multible && numberofLine?10:0,
                 alignItems:multible && numberofLine?'flex-start':'center'

            }]}>
                {prefix && prefix}
                <View style={{ flex: 1, paddingLeft: prefix ? 6 : 0, paddingRight: affix ? 6 : 0 ,}}>
                    <TextInput
                        style={[globalStyle.text, {margin:0,padding:0, flex:1, verticalAlign:multible && numberofLine?'top':'auto' }]}
                        placeholder={placeholder ?? ''}
                        placeholderTextColor='#676767'
                        value={value}
                        multiline={multible}
                        numberOfLines={numberofLine}
                        onChangeText={val => onChange(val)} />
                </View>
                {affix && affix}
                {
                    allowClear && value &&
                    <TouchableOpacity onPress={() => onChange('')}>
                        <AntDesign name='close' size={20} color={colors.white} />
                    </TouchableOpacity>
                }

            </RowComponent>

        </View>
    )
}

export default InputComponent