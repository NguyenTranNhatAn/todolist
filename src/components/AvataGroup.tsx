import { View, Text, Image } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { colors } from '../constants/colors'
import { fontFamily } from '../constants/fontFamilies'

const AvataGroup = () => {
    const uidLength = 10;
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
            {Array.from({ length: uidLength }).map((item, index) =>
                index < 3 &&
                <Image key={`image${index}`} source={{ uri: imageURL }} style={[imageStyle, { marginLeft: index > 0 ? -10 : 0 }]} />
            )}
            {
                uidLength > 5 &&
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
                        text={`+${uidLength - 3 > 9 ? 9 : uidLength - 3}`} />
                </View>
            }
        </RowComponent>
    )
}

export default AvataGroup