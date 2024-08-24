import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import { globalStyle } from '../../style/globalStyle'
import RowComponent from '../../components/RowComponent'
import SectionComponent from '../../components/SectionComponent'
import TextComponent from '../../components/TextComponent'
import { fontFamily } from '../../constants/fontFamilies'
import TitleComponent from '../../components/TitleComponent'
import { colors } from '../../constants/colors'
import CardComponent from '../../components/CardComponent'
import { Add, Edit2, Element4, Logout, Notification, SearchNormal1 } from 'iconsax-react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TagComponent from '../../components/TagComponent'
import SpaceComponent from '../../components/SpaceComponent'
import CicularComponent from '../../components/CicularComponent'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import CardImageComponent from '../../components/CardImageComponent'
import AvataGroup from '../../components/AvataGroup'
import ProgressBar from '../../components/ProgressBarComponent'
import ProgressBarComponet from '../../components/ProgressBarComponent'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { TaskModel } from '../../models/TaskModel'
const HomeScreen = ({ navigation }: any) => {
  const user = auth().currentUser;
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  useEffect(() => {
    getNewTask();

  }, [])

  const getNewTask = async () => {
    setIsLoading(true);
    await
      firestore().
        collection('tasks')
        .where('uids', 'array-contains', user?.uid)
        .limit(3)
        .onSnapshot(snap => {
          if (snap.empty) {
            console.log('Task not found')
            setIsLoading(false)
          }
          else {
            const items: TaskModel[] = [];
            snap.forEach((item: any) => {

              items.push({
                id: item.id,
                ...item.data(),
              })

            }
            );
            setIsLoading(false);
            setTasks(items);


          }
        })
  }

  return (
    <View style={{ flex: 1 }}>
      <Container isScroll >
        <StatusBar barStyle={'light-content'} backgroundColor={colors.bgcolor} />
        <SectionComponent>
          <RowComponent justify='space-between'>
            <Element4 size={24} color={colors.desc} />
            <Notification size={24} color={colors.desc} />

          </RowComponent>
        </SectionComponent>
        <SectionComponent>

          <RowComponent>
            <View style={{ flex: 1 }}>
              <TextComponent text={`hi ${user?.email}`} />
              <TitleComponent
                text='Let Productive Today'
              />
            </View>
            <TouchableOpacity onPress={() => auth().signOut()}>
              <Logout size={22} color='coral' />
            </TouchableOpacity>
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent styles={
            [globalStyle.inputContainer]
          } onPress={() => navigation.navigate('SearchScreen')} >
            <TextComponent color='#696b6f' text='Search task' />
            <SearchNormal1 size={20} color={colors.desc} />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <CardComponent>
            <RowComponent>
              <View style={{ flex: 1 }}>
                <TitleComponent text='Task Progress' />
                <TextComponent text='30/40 tasks done' />
                <SpaceComponent height={12} />
                <RowComponent justify='flex-start'>
                  <TagComponent onPress={() => console.log('sayhi')} text='Match 22' />
                </RowComponent>
              </View>
              <View >
                <CicularComponent color={colors.blue} value={80} />
              </View>

            </RowComponent>
          </CardComponent>
        </SectionComponent>
        {
          isLoading ? <ActivityIndicator /> : tasks.length > 0
            ?
            <SectionComponent>
              <RowComponent styles={{ alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <CardImageComponent onPress={() => navigation.navigate('TaskDetail', {
                    id: tasks[0].id,
                  })}>
                    <TouchableOpacity style={[
                      globalStyle.iconContainer
                    ]}
                    >
                      <Edit2 onPress={() => navigation.navigate('AddNewTask', { editable: true, task: tasks[0] })} size={20} color={colors.white} />
                    </TouchableOpacity>
                    <TitleComponent size={18} text={tasks[0].title ?? ''} />
                    <TextComponent line={3} text={tasks[0].description ?? ''} size={13} />
                    <View style={{ marginVertical: 24 }}>
                      <AvataGroup uids={tasks[0].uids} />
                      {
                        tasks[0].progress &&
                          (tasks[0].progress as number) >= 0 ?
                          <ProgressBarComponet percent={`${Math.floor(tasks[0].progress * 100)}%`}
                            color={'#0aacff'} size='large' />
                          : null}

                    </View>
                    <TextComponent
                      size={12}
                      color={colors.desc}

                      text={`Due ${tasks[0].dueDate.toDate()}`} />
                  </CardImageComponent>
                </View>
                <SpaceComponent width={16} />
                <View style={{ flex: 1, }}>
                  {
                    tasks[1] &&
                    <CardImageComponent onPress={() => navigation.navigate('TaskDetail', {
                      id: tasks[1].id,
                      color: 'rgba(33,150,243,0.9)'
                    })} color='rgba(33,150,243,0.9)'>
                      <TouchableOpacity style={[
                        globalStyle.iconContainer
                      ]}
                      >
                        <Edit2 onPress={() => navigation.navigate('AddNewTask', { editable: true, task: tasks[1] })} size={20} color={colors.white} />

                      </TouchableOpacity>
                      <TitleComponent size={18} text={tasks[1].title ?? ''} />
                      {tasks[1].uids && <AvataGroup uids={tasks[1].uids} />}
                      {tasks[1].progress &&
                        <ProgressBarComponet percent={`${Math.floor(tasks[1].progress * 100)}%`} color={'#a2f068'} />
                      }

                    </CardImageComponent>
                  }

                  <SpaceComponent height={16} />
                  {tasks[2] &&
                    <CardImageComponent
                      onPress={() => navigation.navigate('TaskDetail', {
                        id: tasks[2].id,
                        color: 'rgba(18,181,122,0.9)'
                      })}
                      color='rgba(18,181,122,0.9)'>
                      <TouchableOpacity style={[
                        globalStyle.iconContainer
                      ]}
                      >
                        <Edit2 onPress={() => navigation.navigate('AddNewTask', { editable: true, task: tasks[2] })} size={20} color={colors.white} />

                      </TouchableOpacity>
                      <TitleComponent size={18} text={tasks[2].title ?? ''} />
                      <TextComponent text={tasks[2].description ?? ''} size={13} />


                    </CardImageComponent>}
                </View>
              </RowComponent>
            </SectionComponent>
            : <></>
        }

        <SpaceComponent height={16} />
        <SectionComponent>
          <TitleComponent
            font={fontFamily.bold}
            size={21}
            text='Urgents tasks' />
          <CardComponent>
            <RowComponent>
              <CicularComponent radius={36} value={80} />
              <View style={{
                flex: 1,
                justifyContent: 'center',
                paddingLeft: 12,
              }}>
                <TextComponent text='nhâtna' />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>

      </Container>
      <View style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'

      }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddNewTask', {
            editable: false, task: undefined
          })}
          activeOpacity={1}
          style={[
            globalStyle.row,
            {
              backgroundColor: colors.blue,
              padding: 10,
              borderRadius: 100,
              width: '80%',

            }
          ]}>
          <TextComponent text='New Task' flex={0} />
          <Add size={22} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen