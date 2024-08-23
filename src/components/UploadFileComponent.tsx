import { View, Text, TouchableOpacity, Modal, Dimensions, Platform, PermissionsAndroid, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Attachment } from '../models/TaskModel'
import { DocumentUpload } from 'iconsax-react-native'
import { colors } from '../constants/colors'
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker'
import TextComponent from './TextComponent'
import { globalStyle } from '../style/globalStyle'
import TitleComponent from './TitleComponent'
import SpaceComponent from './SpaceComponent'
import { calcFileSize } from '../utils/calcFileSize'
import { Slider } from '@miblanchard/react-native-slider'
import RowComponent from './RowComponent'
import storage from '@react-native-firebase/storage'
import RNFetchBlob from 'rn-fetch-blob'

interface Props {
  onUpload: (file: Attachment) => void
}
const UploadFileComponent = (props: Props) => {
  const { onUpload } = props;
  const [progressUpload, setprogressUpload] = useState(0);

  const [file, setFile] = useState<DocumentPickerResponse>();
  const [isVisible, setIsVisible] = useState(false);
  const [attachmentFile, setAttachmenFile] = useState<Attachment>()



  const uploadFile = async (uri: string, fileName: string): Promise<void> => {
    try {
      // Đọc tệp từ URI và chuyển đổi thành dữ liệu base64
      const fileData = await RNFetchBlob.fs.readFile(uri, 'base64');

      // Đường dẫn lưu trữ trên Firebase
      const firebasePath = `documents/${fileName}`;

      // Tải lên Firebase Storage bằng putString
      const uploadTask = storage().ref(firebasePath).putString(fileData, 'base64', { contentType: 'application/pdf' });

      uploadTask.on('state_changed', snapshot => {
        console.log(`Transferred: ${snapshot.bytesTransferred}`);
      });

      await uploadTask;

      // Lấy URL tải xuống sau khi tệp đã được tải lên
      const downloadURL = await storage().ref(firebasePath).getDownloadURL();
      console.log('File available at:', downloadURL);

    } catch (error) {
      console.error('Error reading file or uploading:', error);
    }
  };

  // Khi người dùng chọn tệp PDF
  const handlePickerDocument = async (): Promise<void> => {
    try {
      const res: DocumentPickerResponse = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });

      const uri = res.uri;
      const fileName = res.name;

      // Gọi hàm upload
      await uploadFile(uri, fileName ?? '');

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Unknown error:', err);
      }
    }
  };

  useEffect(() => {
    file && handleUploadFile()
   
  }, [file])

  useEffect(() => {
    if (attachmentFile) {

      onUpload(attachmentFile)
      setIsVisible(false)
      setprogressUpload(0)
      setAttachmenFile(undefined)

    }
  }, [attachmentFile])
  
  const handleUploadFile = async () => {
    if (file) {

      setIsVisible(true);
      const path = `/documents/${file.name}`
      const fileData= await RNFetchBlob.fs.readFile(file.uri,'base64')
      const res = storage().ref(path).putString(fileData,'base64')
      res.on('state_changed', snap => {

        setprogressUpload(snap.bytesTransferred / snap.totalBytes)
      }, (error) => {
        console.log('up',error)
      }, () => {
        //get download url
        storage().ref(path).getDownloadURL().then(url => {
          const data: Attachment = {
            name: file.name ?? '',
            url,
            size: file.size ?? 0
          }
          setAttachmenFile(data)

        })
      })
    }
  }

  return (
    <>
      <TouchableOpacity onPress={() => DocumentPicker.pick({
        allowMultiSelection: false,
        type: [DocumentPicker.types.pdf,DocumentPicker.types.doc,DocumentPicker.types.xls],
        copyTo: 'cachesDirectory'
      }).then(res => {
        setFile(res[0])

      })}>
        <DocumentUpload color={colors.white} size={24} />
      </TouchableOpacity>
      <Modal visible={isVisible}
        statusBarTranslucent
        style={{ flex: 1 }}
        transparent
        animationType='slide'>
        <View style={[globalStyle.container, {
          backgroundColor: `${colors.gray}A1`,
          justifyContent: 'center',
          alignItems: 'center',

        }]}>
          <View style={{
            margin: 20,
            width: Dimensions.get('window').width * 0.8, height: 'auto',
            padding: 12,
            borderRadius: 12,
            backgroundColor: colors.white
          }}>
            <TitleComponent flex={0} color={colors.bgcolor} text='Uploading...' />
            <SpaceComponent height={20} />
            <View>
              <TextComponent color={colors.bgcolor}
                flex={0}
                text={file?.name ?? ''} />
              <TextComponent
                size={12}
                color={colors.gray2}
                flex={0}
                text={`${calcFileSize(file?.size as number)}`} />
              <RowComponent>

                <View style={{
                  flex: 1, marginRight: 12,
                }}>
                  <Slider
                    value={progressUpload}
                    trackStyle={{ height: 6, borderRadius: 100 }}
                    minimumTrackTintColor={colors.success}
                    maximumTrackTintColor={colors.desc}

                    renderThumbComponent={() => null} />

                </View>
                <TextComponent
                  color={colors.bgcolor}
                  flex={0}
                  text={`${Math.round(progressUpload * 100)}%`} />
              </RowComponent>
            </View>
          </View>

        </View>
      </Modal>
    </>
  )
}

export default UploadFileComponent