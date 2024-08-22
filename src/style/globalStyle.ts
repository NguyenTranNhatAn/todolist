import { Platform, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { fontFamily } from "../constants/fontFamilies";

export const globalStyle = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: colors.bgcolor,
       
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },

    text: {
        fontSize: 14,
        fontFamily: fontFamily.regular,
        color: colors.text,

    },
    inputContainer: {
        backgroundColor: colors.gray,
        borderRadius: 12,
        paddingHorizontal: Platform.OS === 'ios' ? 12 : 10,
        paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    },
    section: {
        marginBottom: 16,
        paddingHorizontal:20,
    },
    tag: {
        paddingHorizontal: 20,
        paddingVertical: Platform.OS === 'ios' ? 6 : 4,
        borderRadius: 100,
        backgroundColor: colors.blue
    },
    card:{
        
        borderRadius:12,

    },
    iconContainer:{
        width:40,
        height:40,
        marginBottom:16,
        borderRadius:100, 
        backgroundColor:'rgba(0,0,0,0.2)',
        justifyContent:'center',
        alignItems:'center'},

    documentImg:{
        marginHorizontal:4,

    }
    
})