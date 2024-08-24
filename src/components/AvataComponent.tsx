import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { colors } from '../constants/colors'
import { globalStyle } from '../style/globalStyle'
import { fontFamily } from '../constants/fontFamilies'
import { UserDetail } from '../models/UserDetail'

interface Props {
    uid: string,
    index?: number
}
const AvataComponent = (props: Props) => {
    const { uid, index } = props;
    const [userDetail, setUserDetail] = useState<UserDetail>()
    useEffect(() => {
        firestore()
            .doc(`users/${uid}`)
            .get()
            .then((snap:any) => {
                snap.exists &&
                    setUserDetail({
                        uid,
                        ...snap.data()
                    })
            }).catch(err => console.log(err))
    }, [uid])
    const imageStyle = {
        width: 32,
        height: 32,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.white
    }
    return userDetail ? (
        userDetail.imgUrl ?
            <Image source={{ uri: userDetail.imgUrl }}
                key={`image${uid}`}
                style={[imageStyle, { marginLeft: index && index > 0 ? -10 : 0 }]}
            />
            : (
                <View key={`image${uid}`}
                    style={[
                        imageStyle,
                        {
                            marginLeft: index && index > 0 ? - 10 : 0,
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:colors.gray2
                        }
                    ]}
                >
                    <Text style={[
                        globalStyle.text,
                        {fontFamily:fontFamily.bold,fontSize:14}
                    ]}>
                        {userDetail.displayName.substring(0,1).toLocaleUpperCase()}
                    </Text>

                </View >
            )

    ) : <></>
}

export default AvataComponent