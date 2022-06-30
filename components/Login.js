import React, { useState } from 'react'
import { NavigationContext } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import styles from '../styles/styles'
import InputText from './common/inputs/InputText';


const Login = () => {

    const navigation = React.useContext(NavigationContext);
    const [name,setName] = useState("")
    const [apellido,setApellido] = useState("")
    const [direccion,setDireccion] = useState("")
    const [password,setPassword] = useState("")

    const onPressbtn = () => {
        navigation.navigate("Registrer")
    }
    
    const onPressbtnLogin = () => {
        console.log(name,apellido,direccion, password)
    }

    return (
        <ScrollView
            style={[styles.containerMain,]}
            showsVerticalScrollIndicator={false}
        >
            <Text style={[styles.textTitle]}>Login</Text>


            <InputText value={name} setValue={setName} namePlaceholder={"Nombre"} pass={false}/>
            <InputText value={apellido} setValue={setApellido} namePlaceholder={"Apellido"} pass={false}/>
            <InputText value={direccion} setValue={setDireccion} namePlaceholder={"Direccion"} pass={false}/>
            <InputText value={password} setValue={setPassword} namePlaceholder={"Password"} pass={true}/>


            <TouchableOpacity
                style={styles.btnLarge}
                onPress={() => onPressbtnLogin()}
            >
                <Text
                style={styles.textBtn}
                >Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btnLarge}
                onPress={() => onPressbtn()}
            >
                <Text
                style={styles.textBtn}
                >Registrer</Text>
            </TouchableOpacity>
        </ScrollView>

    )
}

export default Login