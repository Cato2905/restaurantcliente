import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import styles from '../styles/styles'
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import IconFontisto from 'react-native-vector-icons/Fontisto'
import TouOpasLarge from './common/buttons/TouOpasLarge'
import InputText from './common/inputs/InputText'
import { firebase } from '@react-native-firebase/firestore';






const Perfil = ({ user, logOut }) => {

    const [name, setName] = useState(user.nombre)
    const [apellido, setApellido] = useState(user.apellido)
    const [email, setEmail] = useState(user.email)
    const [direccion, setDireccion] = useState(user.direccion)



    const onPressLogOut = () => {
        logOut()
    }


    const onPressEditar = () => {

        firebase.firestore().collection("Trabajador").doc(user.id).update({
            nombre: name,
            apellido: apellido,
            direccion: direccion
        })





        console.log(user)
    }


    return (

        <ScrollView style={[styles.containerMain]}>

            <View style={[styles.cardPerfil]}>
                
                <Text style={[styles.textTitle]}>
                    Perfil
                    {/* {[user.apellido,user.direccion]} */}
                </Text>

                <IconAwesome name="user-circle-o" size={60} color="#4F8EF7"
                    style={{ alignSelf: "center" }}
                />

                <Text style={[styles.textBody]}>
                    <IconAwesome name="user-o" size={30} color="#34495E" />
                    {["  ", user.nombre, " ", user.apellido]}
                </Text>

                <Text style={[styles.textBody]}>
                    <IconFontisto name="email" size={30} color="#34495E" />
                    {["  ", user.email]}
                </Text>

                <Text style={[styles.textBody]}>
                    <IconAwesome name="home" size={30} color="#34495E" />
                    {["  ", user.direccion]}
                </Text>

            </View>


            <Text style={[styles.textTitle]}>
                Editar perfil
            </Text>

            <Text style={[styles.textSubTitle]}>
                Nombre
            </Text>
            <InputText value={name} setValue={setName} namePlaceholder={"Nombre"} pass={false} />

            <Text style={[styles.textSubTitle]}>
                Apellido
            </Text>
            <InputText value={apellido} setValue={setApellido} namePlaceholder={"apellido"} pass={false} />

            <Text style={[styles.textSubTitle]}>
                Email
            </Text>
            <InputText value={email} setValue={setEmail} namePlaceholder={"email"} editable={false} />

            <Text style={[styles.textSubTitle]}>
                Direccion
            </Text>
            <InputText value={direccion} setValue={setDireccion} namePlaceholder={"direccion"} pass={false} />

            <View style={{ width: "100%", marginTop: "10%" }}>
                <TouOpasLarge nameBtn={"Guardar"} nameOnPress={onPressEditar} />
            </View>

            <View style={{ width: "100%", marginBottom: "30%" }}>
                <TouOpasLarge nameBtn={"Log out"} nameOnPress={onPressLogOut} />
            </View>
        </ScrollView>

    )
}

export default Perfil