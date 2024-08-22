import { View, Text, Image } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { colors } from '../constants/colors'
import { fontFamily } from '../constants/fontFamilies'
interface Props{
    uids:string[]
}
const AvataGroup = (props:Props) => {
    const {uids}=props;

    const imageURL = 'https://tse4.mm.bing.net/th?id=OIP.f3kBflMGXMGojAj6zhoglQHaGh&pid=Api&P=0&h=220'
    const imageStyle = {
        width: 32,
        height: 32,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.white,
    }
    return (
        <RowComponent justify='flex-start'>
            {Array.from({ length: uids.length }).map((item, index) =>
                index < 3 &&
                <Image key={`image${index}`} source={{ uri: imageURL }} style={[imageStyle, { marginLeft: index > 0 ? -10 : 0 }]} />
            )}
            {
                uids.length > 5 &&
                <View style={[
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
                            lineHeight: 19
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