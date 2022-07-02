import { StyleSheet } from "react-native";

export const primaryColor = "#148D6F"
export const textColor = "#34495E"

export default StyleSheet.create({
    containerMain:{
        width:"100%",
        height:"100%",
        padding:"5%"
    },
    textTitle:{
        width:"100%",
        textAlign:"center",
        fontSize:24,
        color: primaryColor
    },
    textBody:{
        width:"100%",
        fontSize:20,
        color: textColor
    },
    textSubTitle:{
        width:"100%",
        fontSize:18,
        color: primaryColor,
        marginTop:"5%"
    },
    textInput:{
        width:"100%",
        padding:"3%",
        borderWidth:1,
        borderColor:primaryColor,
        marginTop:"3%"
    },
    btnLarge:{
        width: '100%', 
        backgroundColor: primaryColor,
        padding:"3%",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:50,
        marginTop:"3%"
    },
    textBtn:{
        fontSize:16,
        color:"black",

    },
    cardPerfil:{
        width:"100%",
        padding:"3%",
        elevation:12,
        marginBottom:"5%",
        border:1,
        backgroundColor:"white",
        borderRadius:10,
        borderColor:"#CCC",
        borderWidth:1,
        
    }

})