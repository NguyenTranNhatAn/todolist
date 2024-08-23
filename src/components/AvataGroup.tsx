import { View, Text, Image } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { colors } from '../constants/colors'
import { fontFamily } from '../constants/fontFamilies'
import AvataComponent from './AvataComponent'
interface Props{
    uids:string[]
}
const AvataGroup = (props:Props) => {
    const {uids}=props;

  
    const imageStyle = {
        width: 32,
        height: 32,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.white,
    }
    return (
        <RowComponent justify='flex-start'>
            {uids.map( (item,index) => index<3 &&<AvataComponent uid={item} index={index}/> )
            }
            {
                uids.length > 3 &&
                <View
                key={'total'}
                 style={[
                    imageStyle,
                    {
                        marginLeft: -10,
                        justifyContent: 'center',
                        borderWidth: 1,
                        alignItems: 'center',
                        backgroundColor: 'coral'
                    }]}>
                    <TextComponent
                        flex={0}
                        styles={{
                            lineHeight: 13
                        }}
                        size={12}
                        font={fontFamily.semiBold}
                        text={`+${uids.length - 3 > 9 ? 9 : uids.length - 3}`} />
                </View>
            }
        </RowComponent>
    )
}

export default AvataGroup