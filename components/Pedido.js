import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import styles from '../styles/styles'
import Countdown from 'react-countdown';
import { firebase } from '@react-native-firebase/firestore'
import TouOpasLarge from './common/buttons/TouOpasLarge';

const Pedido = (user) => {


    const [promo, setPromo] = useState([]);
    const [userId, setUserId] = useState(0);
    const [tiempo, setTiempo] = useState(0);
    const [completado, setCompletado] = useState(false)


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
            setUserId(element.id)
            setTiempo(element.tiempoEntrega)
            setCompletado(element.completado)
        });
    }, [promo]);


    const boton = () => {
        console.log(user.user.id)
        console.log(comple)

    }

    return (
        <ScrollView
            style={[styles.containerMain,]}
            showsVerticalScrollIndicator={false}
        >
            <Text style={[styles.textTitle, { marginBottom: "5%" }]}>Estado del pedido</Text>
            {user.user.id === userId ? (

                <>

                    {promo.map((item, index) => [

                        <>
                            {tiempo === 0 ? (
                                <>
                                    <Text style={{ textAlign: 'center' }}>Hemos recibido tu orden...</Text>
                                    <Text style={{ textAlign: 'center' }}>Estamos calculando el tiempo de entrega</Text>
                                </>
                            ) : (


                                <>
                                    {completado === false ? (
                                        <View style={[styles.cardPerfil]}>
                                            <Text style={[styles.textBody, { textAlign: 'center' }]}>
                                                {["Hola ", item.nombre, " ", item.apellido]}
                                            </Text>
                                            <Text style={[styles.textBody, { textAlign: 'center', marginVertical: "4%" }]} >
                                                Su orden estara preparada en {item.tiempoEntrega} minutos aproximadamente
                                            </Text>
                                            <Text style={[styles.textBody, { textAlign: 'center',  }]}>
                                                Sera despachado a la direccion {item.direccion}
                                            </Text>
                                            <Text style={[styles.textBody, { textAlign: 'center' , marginVertical: "4%"}]}>
                                                Su es pedido
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



                                    ) : (
                                        <>
                                            <Text style={{ textAlign: 'center' }}>Hemos completado su orden...</Text>
                                            <Text style={{ textAlign: 'center' }}>El repartidor pronto estara en su puerta</Text>
                                        </>
                                    )}

                                </>

                            )}



                        </>


                    ])}
                    < View style={{ marginBottom: "25%" }}>
                        <TouOpasLarge nameBtn={"console log boton"} nameOnPress={boton} />
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