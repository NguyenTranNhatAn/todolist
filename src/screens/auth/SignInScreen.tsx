import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import SectionComponent from '../../components/SectionComponent'
import TextComponent from '../../components/TextComponent'
import TitleComponent from '../../components/TitleComponent'
import { fontFamily } from '../../constants/fontFamilies'
import InputComponent from '../../components/InputComponent'
import { Lock, Sms } from 'iconsax-react-native'
import { colors } from '../../constants/colors'
import ButtonComponent from '../../components/ButtonComponent'
import SpaceComponent from '../../components/SpaceComponent'
import { globalStyle } from '../../style/globalStyle'
import auth from '@react-native-firebase/auth'
import { HandleUser } from '../../utils/handleUser'

const SignInScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState('');
    const handleSignInWithEmail = async () => {
        if (!email || !password) {
            setErrorText('Please enter your email and password')
        }
        else {
            setErrorText('')
            setIsLoading(true)
            await auth().createUserWithEmailAndPassword(email,password).then(userCredential=>{
                const user= userCredential.user
                HandleUser.SaveToDataBase(user);
                console.log(user)
                setIsLoading(false)
            }).catch((error:any) =>{
                setIsLoading(false)
                setErrorText(error.message)
            })
        }
    }
    useEffect(() => {
        if(email ||password ){
            setErrorText('')
            
        }
    }, [email,password]);
    return (
        <Container>
            <SectionComponent styles={{ justifyContent: 'center', flex: 1 }}>
                <TitleComponent
                    styles={{ textTransform: 'uppercase', textAlign: 'center' }}
                    size={32} font={fontFamily.bold}
                    flex={0} text='Sign In' />
                <View style={{ marginVertical: 20 }}>
                    <InputComponent
                        placeholder='Email'
                        title='Email'
                        value={email}
                        allowClear
                        onChange={(val) => setEmail(val)}
                        prefix={<Sms size={20} color={colors.desc} />} />
                    <InputComponent
                        placeholder='Password'
                        title='Password'
                        value={password}
                        isPassword
                        onChange={(val) => setPassword(val)}
                        prefix={<Lock size={20} color={colors.desc} />} />
                    {
                        errorText &&
                        <TextComponent flex={0} text={errorText} color='coral' />
                    }
                </View>
                <ButtonComponent text='Sign in' isLoading={isLoading} onPress={handleSignInWithEmail} />
                <SpaceComponent height={20} />
                <Text style={[globalStyle.text, { textAlign: 'center' }]}>
                    You already have an account? <Text onPress={() => navigation.navigate('LoginScreen')} style={{ color: 'coral' }}>Login</Text>
                </Text>
            </SectionComponent>
        </Container>
    )
}

export default SignInScreen