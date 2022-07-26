import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Alert, ToastAndroid } from 'react-native'
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


        if (name.trim() === "" || apellido.trim() === "" || email.trim() === "" || direccion.trim() === "" || password.trim() === "" ) {
            Alert.alert(
                "Debe rellenar todos los campos"
            )
            return;
        }

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

        ToastAndroid.show('Registro existoso', 2000)

    }






    return (

        <ScrollView
            style={[styles.containerMain]}
            showsVerticalScrollIndicator={false}
        >
            <Text style={[styles.textTitle]}>
                Registrer
            </Text>

            <Text style={[styles.textSubTitle]}>nombre</Text>
            <InputText value={name} setValue={setName} namePlaceholder={"Nombre"} pass={false} />
            <Text style={[styles.textSubTitle]}>Apellido</Text>
            <InputText value={apellido} setValue={setApellido} namePlaceholder={"apellido"} pass={false} />
            <Text style={[styles.textSubTitle]}>Email</Text>
            <InputText value={email} setValue={setEmail} namePlaceholder={"email"} pass={false} />
            <Text style={[styles.textSubTitle]}>Direccion</Text>
            <InputText value={direccion} setValue={setDireccion} namePlaceholder={"direccion"} pass={false} />
            <Text style={[styles.textSubTitle]}>Contraseña</Text>
            <InputText value={password} setValue={setPassword} namePlaceholder={"contraseña"} pass={true} />
            <Text style={[styles.textSubTitle]}>Confirmar contraseña</Text>
            <InputText value={passwordConfirm} setValue={setPasswordConfirm} namePlaceholder={"confirmar contraseña"} pass={true} />

            <View style={{ width: "100%", marginBottom: "30%" }}>
                <TouOpasLarge nameBtn={"Registrar"} nameOnPress={RegisterBtn} />
            </View>
        </ScrollView>


    )
}

export default Register