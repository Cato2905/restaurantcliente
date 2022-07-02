import React, { useEffect, useState } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import styles from '../styles/styles'
import TouOpasLarge from './common/buttons/TouOpasLarge'
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import IconFontisto from 'react-native-vector-icons/Fontisto'
import { firebase } from '@react-native-firebase/firestore';





const Home = ({ user, logOut }) => {

    const [promo, setPromo] = useState([]);


    const onPressLogOut = () => {
        // logOut()
        console.log(promo)
    }

    useEffect(() => {

        firebase.firestore().collection("productos").onSnapshot((docSnapshot) => {

            const dataArray = []

            docSnapshot.docs.map((doc) => {

                dataArray.push(doc.data())

                // console.log(doc.data().nombre)
            })

            setPromo(dataArray)

        });
    }, [])




    return (
        <ScrollView style={[styles.containerMain]}>
            <Text style={[styles.textTitle]}>
                Menu

            </Text>

            {promo.map((item) => [
                <View style={[styles.cardPerfil]}>
                    <View style={[{ flexDirection: "row", flexWrap: 'wrap' }]}>
                        <View style={{ width: "50%", }}>
                            <Image source={{ uri: `${item.imagen}` }}
                                style={{ width: 150, height: 150 }} />

                            <Text style={[styles.textSubTitle, { textAlign: 'center', }]}>{item.nombre}</Text>
                        </View>
                        <View style={{ width: "50%", }}>
                            <Text style={[styles.textSubTitle, { textAlign: 'center', borderBottomWidth:1, borderColor:"#BBB"}]}>Precio: ${item.precio}</Text>
                            <Text style={[styles.textSubTitle, { textAlign: 'center', }]}>{item.descripcion}</Text>
                        </View>
                    </View>
                    <TouOpasLarge nameBtn={"Agregar a carrito"} />
                </View>
            ])}

            {/* <Image
            style={{width:150, height:150, }}
            source={{
                uri:"data:image/jpeg;base64,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"
            }}
            /> */}
            <TouOpasLarge nameBtn={"Log out"} nameOnPress={onPressLogOut} />
        </ScrollView>
    )
}

export default Home