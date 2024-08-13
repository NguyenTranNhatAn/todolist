import React from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { globalStyle } from '../style/globalStyle';
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';
interface Props {
    text: string,
    color?: string,
    tagStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    onPress?: () =>void;
}
const TagComponent = (props:Props) => {
    const {text,color,textStyle,tagStyle,onPress}=props;
    return (
        <TouchableOpacity onPress={onPress} disabled={!onPress} style={[globalStyle.tag,tagStyle,{backgroundColor:color ?? colors.blue}]}>
        <TextComponent text={text}/>    
        </TouchableOpacity>
    )
}

export default TagComponent

const styles = StyleSheet.create({})