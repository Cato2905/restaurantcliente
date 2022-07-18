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
    const [index, setIndex] = useState(0);
    const [completado, setCompletado] = useState(false)


    useEffect(() => {

        firebase.firestore().collection("ordenes").onSnapshot((docSnapshot) => {

            const dataArray = []

            docSnapshot.docs.map((doc, indexDoc) => {

                dataArray.push({ ...doc.data(), indexDoc })
                setIndex(indexDoc+1)
                // console.log(doc.data().nombre)
            })

            setPromo(dataArray)

        });



    }, [])

    useEffect(() => {
        promo.forEach(element => {

            if (element.id === user.user.id) {
                setUserId(element.id)
            }

            setTiempo(element.tiempoEntrega)
            setCompletado(element.completado)
        });
    }, [user]);


    const boton = () => {
        console.log(user.user.id)
        console.log(userId)
        console.log(completado)

    }

    return (
        <ScrollView
            style={[styles.containerMain,]}
            showsVerticalScrollIndicator={false}
        >
            <Text style={[styles.textTitle,{fontWeight:'bold'}]}>Estado del pedido</Text>
            <Text style={[styles.textSubTitle,{marginBottom:"3%", fontWeight:'bold'} ]}>Actualmente tenemos {index} pedidos en cola</Text>

            {promo.map((item, index) => [



                <>
                    {item.id == user.user.id && (

                        <>


                            {tiempo === 0 ? (
                                <>
                                    <Text style={{ textAlign: 'center', fontSize: 20, marginTop: "10%", color: "#34495E" }}>Hemos recibido tu orden...</Text>
                                    <Text style={{ textAlign: 'center', fontSize: 20, color: "#34495E" }}>Estamos calculando el tiempo de entrega</Text>
                                </>
                            ) : (


                                <>
                                    {completado === false ? (
                                        <View style={[styles.cardPerfil, { marginBottom: "10%" }]}>
                                            <Text style={[styles.textBody, { textAlign: 'center' }]}>
                                                {["Hola ", item.nombre, " ", item.apellido]}
                                            </Text>
                                            <Text style={[styles.textBody, { textAlign: 'center', marginVertical: "4%" }]} >
                                                Su pedido es el número {index+1} en la cola
                                            </Text>
                                            <Text style={[styles.textBody, { textAlign: 'center', marginVertical: "4%" }]} >
                                                La orden estará preparada en {item.tiempoEntrega} minutos aproximadamente
                                            </Text>
                                            <Text style={[styles.textBody, { textAlign: 'center', }]}>
                                                Sera despachado a la dirección {item.direccion}
                                            </Text>
                                            <Text style={[styles.textBody, { textAlign: 'center', marginVertical: "4%" }]}>
                                                Su pedido
                                            </Text>



                                            {item.pedido.map((itemPedido) => [
                                                <View style={[styles.cardPerfil, { marginVertical: "4%" }]}>
                                                    <Text style={[styles.textBody, { textAlign: 'center' }]}>
                                                        Nombre promoción: {itemPedido.nombre}
                                                    </Text>
                                                    <Text style={[styles.textBody, { textAlign: 'center', marginVertical: "4%" }]}>
                                                        Cantidad: {itemPedido.cantidadPromo}
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
                                            <Text style={{ textAlign: 'center', fontSize: 20, marginTop: "10%", color: "#34495E" }}>Hemos completado su orden...</Text>
                                            <Text style={{ textAlign: 'center', fontSize: 20, color: "#34495E" }}>El repartidor pronto estara en su puerta</Text>
                                        </>
                                    )}

                                </>

                            )}





                        </>

                    )}

                </>


            ])}







        </ScrollView >





    )
}


export default Pedido