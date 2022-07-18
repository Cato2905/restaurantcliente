import React, { useState } from 'react'
import { NavigationContext } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native'
import styles from '../styles/styles'
import InputText from './common/inputs/InputText';
import { firebase } from '@react-native-firebase/firestore';
import TouOpasLarge from './common/buttons/TouOpasLarge';

const Login = () => {

    const navigation = React.useContext(NavigationContext);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onPressbtn = () => {
        navigation.navigate("Register")
    }

    const onPressbtnLogin = () => {
        // firebase.firestore().collection("Nombres").doc("cualq").set({
        //     name: name,
        //     apellido: apellido,
        //     direccion: direccion,
        //     password: password
        // })

        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
            const uid = userCredential.user.uid
            firebase.firestore().collection("Trabajador").doc(uid).get().then((document) => {
                if (document.exists) {
                    const user = document.data()
                    navigation.navigate("Home", { user })
                }
            })
        })

        // console.log(email, password)
    }

    return (

        <ScrollView
            style={[styles.containerMain,]}
            showsVerticalScrollIndicator={false}
        >


            <View
                style={[{ alignItems: 'center' }]}

            >
                <Image
                    style={{ width: 200, height: 150 }}
                    source={require('../components/common/img/image.png')}
                />
            </View>
            <Text style={[styles.textTitle]}>Iniciar sesión</Text>

            <Text style={[styles.textSubTitle]}>Email</Text>
            <InputText value={email} setValue={setEmail} namePlaceholder={"email"} placeholderTextColor="black" pass={false} />
            <Text style={[styles.textSubTitle]}>Contraseña</Text>
            <InputText value={password} setValue={setPassword} placeholderTextColor="black" namePlaceholder={"Password"} pass={true} />


            {/* <TouchableOpacity
                style={styles.btnLarge}
                onPress={() => onPressbtnLogin()}
            >
                <Text
                style={styles.textBtn}
                >Login</Text>
            </TouchableOpacity> */}

            <TouOpasLarge nameBtn={"Login"} nameOnPress={onPressbtnLogin} />


            {/* <TouchableOpacity
                style={styles.btnLarge}
                onPress={() => onPressbtn()}
            >
                <Text
                style={styles.textBtn}
                >Registrer</Text>
            </TouchableOpacity> */}
            <View
                style={{ marginBottom: "10%" }}
            >
                <TouOpasLarge nameBtn={"Registrar"} nameOnPress={onPressbtn}

                />
            </View>
        </ScrollView>

    )
}

export default Login