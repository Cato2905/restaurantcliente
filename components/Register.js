import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import styles from '../styles/styles'
import TouOpasLarge from './common/buttons/TouOpasLarge'
import InputText from './common/inputs/InputText'
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';


const Register = () => {

    const [name, setName] = useState("")
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("")
    const [direccion, setDireccion] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const userRef = firebase.firestore().collection("Trabajador")


    const RegisterBtn = () => {

        if (password.trim() !== passwordConfirm.trim()) {
            Alert.alert(
                "Las contraseñas no coinciden"
            )
            return;
        }

        console.log(name, apellido, email, direccion, password, passwordConfirm)

        auth().createUserWithEmailAndPassword(email, password).then(
            (userCredential) => {
                const uid = userCredential.user.uid
                const data = {
                    id:uid,
                    email,
                    nombre:name,
                    apellido,
                    direccion
                }
                userRef.doc(uid).set(data)
            }
        )


    }






    return (

        <ScrollView
            style={[styles.containerMain]}
            showsVerticalScrollIndicator={false}
        >
            <Text style={[styles.textTitle]}>
                Registrer
            </Text>

            <InputText value={name} setValue={setName} namePlaceholder={"Nombre"} pass={false} />
            <InputText value={apellido} setValue={setApellido} namePlaceholder={"apellido"} pass={false} />
            <InputText value={email} setValue={setEmail} namePlaceholder={"email"} pass={false} />
            <InputText value={direccion} setValue={setDireccion} namePlaceholder={"direccion"} pass={false} />
            <InputText value={password} setValue={setPassword} namePlaceholder={"contraseña"} pass={true} />
            <InputText value={passwordConfirm} setValue={setPasswordConfirm} namePlaceholder={"confirmar contraseña"} pass={true} />

            <View style={{ width: "100%", marginBottom: "30%" }}>
                <TouOpasLarge nameBtn={"Registrar"} nameOnPress={RegisterBtn} />
            </View>
        </ScrollView>


    )
}

export default Register