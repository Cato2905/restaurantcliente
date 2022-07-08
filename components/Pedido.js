import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import styles from '../styles/styles'
import Countdown from 'react-countdown';
import { firebase } from '@react-native-firebase/firestore'
import TouOpasLarge from './common/buttons/TouOpasLarge';

const Pedido = (user) => {


    const [promo, setPromo] = useState([]);
    const [tiempo, setTiempo] = useState(0);


    useEffect(() => {

        firebase.firestore().collection("ordenes").onSnapshot((docSnapshot) => {

            const dataArray = []

            docSnapshot.docs.map((doc, indexDoc) => {

                dataArray.push({ ...doc.data(), indexDoc })

                // console.log(doc.data().nombre)
            })

            setPromo(dataArray)

        });



    }, [])

    useEffect(() => {
        promo.forEach(element => {
            setTiempo(element.id)
        });
    }, [promo]);


    const boton = () => {
        console.log(user.user.id)
        console.log(tiempo)

    }

    return (
        <ScrollView
            style={[styles.containerMain,]}
            showsVerticalScrollIndicator={false}
        >
            <Text style={[styles.textTitle, { marginBottom: "5%" }]}>Estado del pedido</Text>

            {user.user.id === tiempo ? (
                <>
                    {promo.map((item, index) => [

                        <View style={[styles.cardPerfil]}>
                            <Text style={[styles.textBody, { textAlign: 'center' }]}>
                                {[" ", item.nombre, " ", item.apellido]}
                            </Text>
                            <Text style={[styles.textBody, { textAlign: 'center', marginVertical: "4%" }]} >
                                Su orden estara preparada en {item.tiempoEntrega} minutos aproximadamente
                            </Text>
                            <Text style={[styles.textBody, { textAlign: 'center' }]}>
                                Su orden contiene
                            </Text>


                            {item.pedido.map((itemPedido) => [
                                <View style={[styles.cardPerfil, { marginVertical: "4%" }]}>
                                    <Text style={[styles.textBody, { textAlign: 'center' }]}>
                                        Nombre promocion: {itemPedido.nombre}
                                    </Text>
                                    <Text style={[styles.textBody, { textAlign: 'center', marginVertical: "4%" }]}>
                                        Cantiadad: {itemPedido.cantidadPromo}
                                    </Text>
                                    <Text style={[styles.textBody, { textAlign: 'center' }]}>
                                        {itemPedido.descripcion}
                                    </Text>
                                </View>
                            ])}
                            <Text style={[styles.textBody, { textAlign: 'center' }]}>
                                Su total a pagar es ${item.TotalPedido}
                            </Text>

                        </View>


                    ])}
                    < View style={{ marginBottom: "25%" }}>
                        <TouOpasLarge nameBtn={"boton"} nameOnPress={boton} />
                    </View>
                </>

            ) : (
                < View style={{ marginBottom: "25%" }}>
                    <TouOpasLarge nameBtn={"boton"} nameOnPress={boton} />
                </View>

            )}









        </ScrollView >





    )
}


export default Pedido