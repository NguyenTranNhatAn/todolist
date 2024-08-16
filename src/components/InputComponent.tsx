import { View, Text, TextInput, Touchable, TouchableOpacity, Button } from 'react-native'
import React, { ReactNode, useState } from 'react'
import TitleComponent from './TitleComponent'
import RowComponent from './RowComponent'
import { globalStyle } from '../style/globalStyle'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../constants/colors'
import SectionComponent from './SectionComponent'
import { Eye, EyeSlash } from 'iconsax-react-native'
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
    isPassword?: boolean
}
const InputComponent = (props: Props) => {
    const { isPassword, value, onChange, placeholder, title, prefix, affix, allowClear, multible, numberofLine } = props;
    const [showPass, setShowPass] = useState(false);
    return (
        <View style={{ marginBottom: 16, }}>
            {title && <TitleComponent flex={0} text={title} />}
            <RowComponent styles={[globalStyle.inputContainer, {
                marginTop: title ? 4 : 0,
                minHeight: multible && numberofLine ? 32 * numberofLine : 45,
                paddingVertical: multible && numberofLine ? 10 : 0,
                alignItems: multible && numberofLine ? 'flex-start' : 'center'

            }]}>
                {prefix && prefix}
                <View style={{ flex: 1, paddingLeft: prefix ? 6 : 0, paddingRight: affix ? 6 : 0, }}>
                    <TextInput
                        style={[globalStyle.text, {
                            margin: 0,
                            padding: 0,
                            paddingTop: multible && numberofLine ? 0 : 4,
                            flex: 1,
                            verticalAlign: multible && numberofLine ? 'top' : 'auto'
                        }]}
                        placeholder={placeholder ?? ''}
                        placeholderTextColor='#676767'
                        value={value}
                        autoCapitalize='none'
                        multiline={multible}
                        numberOfLines={numberofLine}
                        secureTextEntry={isPassword ? !showPass : false}
                        onChangeText={val => onChange(val)} />
                </View>
                {affix && affix}
                {
                    allowClear && value &&
                    <TouchableOpacity onPress={() => onChange('')}>
                        <AntDesign name='close' size={20} color={colors.white} />
                    </TouchableOpacity>
                }
                {
                    isPassword &&
                    <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                        {showPass
                            ? <EyeSlash size={20} color={colors.desc} />
                            :<Eye size={20} color={colors.desc}/>
                      } 
                    </TouchableOpacity>
                }

            </RowComponent>

        </View>
    )
}

export default InputComponent