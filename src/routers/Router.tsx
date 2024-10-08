import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/home/HomeScreen';
import AddNewTask from '../screens/tasks/AddNewTask';
import SearchScreen from '../screens/SearchScreen';
import auth from '@react-native-firebase/auth'
import LoginScreen from '../screens/auth/LoginScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import TaskDetail from '../screens/tasks/TaskDetail';
import ListTask from '../screens/tasks/ListTask';
const Router = () => {
    const Stack = createNativeStackNavigator();
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user) {
                setIsLogin(true);
            }
            else {
                setIsLogin(false)
            }
        })
    }, []);
    const MainRouter = <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='AddNewTask' component={AddNewTask} />
        <Stack.Screen name='SearchScreen' component={SearchScreen} />
        <Stack.Screen name='TaskDetail' component={TaskDetail} />
        <Stack.Screen name='ListTask' component={ListTask} />
    </Stack.Navigator>
    const AuthRouter = <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='SignInScreen' component={SignInScreen} />
        
    </Stack.Navigator>
    return isLogin?MainRouter:AuthRouter;
   // return MainRouter;
}


export default Router