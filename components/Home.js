import React, { useEffect, useState } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, Modal, addons, ToastAndroid } from 'react-native'
import styles from '../styles/styles'
import TouOpasLarge from './common/buttons/TouOpasLarge'
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import IconFontisto from 'react-native-vector-icons/Fontisto'
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import { firebase } from '@react-native-firebase/firestore'
import CardModal from './CardModal'
import { uid } from 'uid'
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5'




const Home = ({ user }) => {

    const [promo, setPromo] = useState([]);
    const [modalVisible, setModalVisible] = useState(false)
    const [arrayCarrito, setArrayCarrito] = useState([])
    const [contPrecio, setContPrecio] = useState(0)
    const [existencia, setExistencia] = useState(true)
    const [tiempoEntrega, setTiempoEntrega] = useState(0);
    const [completado, setCompletado] = useState(false)
    const [ordenes, setOrdenes] = useState([])


    const onPressConfirmar = () => {
        const event = new Date();
        const date = event.toLocaleTimeString()
        const date2 = event.toLocaleString()

        // console.log(Date())

        // console.log(arrayCarrito)


        
        firebase.firestore().collection("ordenes").doc(user.id).set({
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            direccion: user.direccion,
            TotalPedido: contPrecio,
            pedido: arrayCarrito,
            horaPedido: date,
            tiempoEntrega: tiempoEntrega,
            completado: completado
        })

        firebase.firestore().collection('ventasDiarias').doc().set({
            TotalPedido: contPrecio,
            FechaPedido : date2
        })

        firebase.firestore().collection("historial").doc().set({
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            direccion: user.direccion,
            TotalPedido: contPrecio,
            pedido: arrayCarrito,
            horaPedido: date,
            tiempoEntrega: tiempoEntrega,
            completado: completado
        })




        setArrayCarrito([])
        setModalVisible(false)

        // console.log(uid(20))
    }



    const verSuma = (resultado, id, contSuma) => {
        const osArray = arrayCarrito

        const updatedOSArray = osArray.map((p, index) =>
            p.indexDoc === id
                ? { ...p, resultado: resultado, cantidadPromo: contSuma }
                : p
        )
        setArrayCarrito(updatedOSArray)

    }

    const onPressAgregarCarrito = (item) => {
        var salir = false
        var resultado = item.precio
        if (arrayCarrito.length === 0) {
            const array = []
            const contSelect = {
                contSelect: 0,
                resultado: resultado,
                cantidadPromo: 1
            }
            const finalObject = Object.assign(item, contSelect)
            array.push(...arrayCarrito, finalObject)
            ToastAndroid.show('Agregado al carrito', 2000)
            setArrayCarrito(array)
            return;

        }

        arrayCarrito.forEach(element => {
            if (item.indexDoc === element.indexDoc) {
                salir = true
            }
        });

        if (salir === false) {
            const array = []
            const contSelect = {
                contSelect: 0,
                resultado: resultado,
                cantidadPromo: 1
            }
            const finalObject = Object.assign(item, contSelect)
            array.push(...arrayCarrito, finalObject)
            setArrayCarrito(array)
            ToastAndroid.show('Agregado al carrito', 2000)

        }

    }

    useEffect(() => {
        var suma = 0
        arrayCarrito.forEach(element => {
            // console.log(element.resultado)
            suma = suma + (element.precio * element.cantidadPromo)
        });
        setContPrecio(suma)
        // console.log(arrayCarrito)
    }, [arrayCarrito])

    useEffect(() => {

        firebase.firestore().collection("productos").onSnapshot((docSnapshot) => {

            const dataArray = []

            docSnapshot.docs.map((doc, indexDoc) => {

                dataArray.push({ ...doc.data(), indexDoc })

                // console.log(doc.data().nombre)
            })

            setPromo(dataArray)

        });
    }, [])


    useEffect(() => {

        firebase.firestore().collection("ordenes").onSnapshot((docSnapshot) => {

            const dataArray = []

            docSnapshot.docs.map((doc, indexDoc) => {

                dataArray.push({ ...doc.data(), indexDoc })

                // console.log(doc.data().nombre)
            })

            setOrdenes(dataArray)

        });
    }, [])







    return (

        <View>
            <ScrollView style={[styles.containerMain]}>


                <Text style={[styles.textTitle, { marginBottom: "4%", fontWeight: 'bold' }]}>
                    <IconAwesome5 name="clipboard-list" size={30} color="#148D6F"
                        style={{ alignSelf: "center" }}
                    /> Menú

                </Text>






                {promo.map((item, index) => [

                    <>
                        {item.existencia === true ? (


                            <View style={[styles.cardPerfil, { marginBottom: "10%" }]} key={index}>
                                <View style={[{ flexDirection: "row", flexWrap: 'wrap' }]}>
                                    <View style={{ width: "50%", }}>
                                        <Image source={{ uri: `${item.imagen}` }}
                                            style={{ width: 150, height: 150 }} />

                                        <Text style={[styles.textSubTitle, { textAlign: 'center', }]}>{item.nombre}</Text>
                                    </View>
                                    <View style={{ width: "50%", }}>
                                        <Text style={[styles.textSubTitle, { textAlign: 'center', borderBottomWidth: 1, borderColor: "#BBB" }]}>Precio: ${item.precio}</Text>
                                        <Text style={[styles.textSubTitle, { textAlign: 'center', }]}>{item.descripcion}</Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={styles.btnLarge}
                                    onPress={() => onPressAgregarCarrito(item)}
                                >
                                    <Text
                                        style={styles.textBtn}
                                    >
                                        Agregar a carrito
                                    </Text>
                                </TouchableOpacity>

                            </View>


                        ) : (<></>)}


                    </>
                ])}







            </ScrollView>


            {ordenes.map((item, index) => [
                <>
                    {promo.map((item, index) => [
                        <>




                        </>
                    ])}
                </>
            ])}

            <Modal visible={modalVisible}>



                <View style={[styles.containerMain, { backgroundColor: "white" }]}>

                    <TouchableOpacity style={[styles.btnClose]} onPress={() => setModalVisible(false)}>
                        <IconFontisto name="close-a" size={15} color="#FFF"
                            style={{ alignSelf: "center" }}
                        />
                    </TouchableOpacity>
                    <ScrollView style={{ width: "100%", height: "80%", marginTop: "10%" }} showsVerticalScrollIndicator={false}>
                        {
                            arrayCarrito.map((item, index) => (
                                <View key={index}>
                                    <CardModal
                                        item={item}
                                        verSuma={verSuma}

                                    />
                                </View>
                            ))

                        }
                    </ScrollView>

                    <Text style={[styles.textTitle, { marginTop: "5%" }]}>
                        ${contPrecio}
                    </Text>

                    <TouOpasLarge nameBtn={"Confirmar"} nameOnPress={onPressConfirmar} />

                </View>

            </Modal>


            <TouchableOpacity style={[styles.viewCarrito]} onPress={() => setModalVisible(true)}>

                <IconAwesome name="shopping-cart" size={30} color="#148D6F"
                    style={{ alignSelf: "center" }}
                />

            </TouchableOpacity>


        </View>


    )
}

export default Home