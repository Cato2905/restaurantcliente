import React, { useEffect, useState } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, Modal, addons } from 'react-native'
import styles from '../styles/styles'
import TouOpasLarge from './common/buttons/TouOpasLarge'
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import IconFontisto from 'react-native-vector-icons/Fontisto'
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import { firebase } from '@react-native-firebase/firestore'
import CardModal from './CardModal'





const Home = () => {

    const [promo, setPromo] = useState([]);
    const [modalVisible, setModalVisible] = useState(false)
    const [arrayCarrito, setArrayCarrito] = useState([])
    const [contPrecio, setContPrecio] = useState(0)
    const [arraySuma, setArraySuma] = useState([])


    const onPressConfirmar = () => {

        console.log(arraySuma)

    }

    const verSuma = (resultado, id) => {
        var salir = false
        const array = []

        console.log(resultado, id)

        const objSuma = {
            resultado: resultado,
            id: id
        }
        if (arraySuma.length === 0) {
            setArraySuma([objSuma])
            return;
        } else {
            arraySuma.forEach((element) => {
                if (element.id === id) {
                    array.push(...array, objSuma)
                    setArraySuma(...arraySuma, objSuma)

                } else {
                    array.push(...array, element)
                }
                console.log("array line 52 ", array)

            });
            console.log("mensaje", array)
            setArraySuma(array)
        }
        // array.push(...arraySuma, objSuma)
        // arrayCarrito.forEach(element => {

        //     if (item.indexDoc === element.indexDoc) {
        //         salir = true
        //     }
        // });
        // setArraySuma(array)
    }

    const onPressAgregarCarrito = (item) => {
        var salir = false
        if (arrayCarrito.length === 0) {
            const array = []
            const contSelect = {
                contSelect: 0
            }
            const finalObject = Object.assign(item, contSelect)
            array.push(...arrayCarrito, finalObject)

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
                contSelect: 0
            }
            const finalObject = Object.assign(item, contSelect)
            array.push(...arrayCarrito, finalObject)
            setArrayCarrito(array)

        }

    }




    useEffect(() => {
        var suma = 0
        arrayCarrito.forEach(element => {
            suma = suma + element.precio
        });
        setContPrecio(suma)
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




    return (

        <View>
            <ScrollView style={[styles.containerMain]}>
                <Text style={[styles.textTitle]}>
                    Menu

                </Text>

                {promo.map((item, index) => [
                    <View style={[styles.cardPerfil]} key={index}>
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
                                Agregar a carrito {item.indexDoc}
                            </Text>
                        </TouchableOpacity>

                    </View>
                ])}







            </ScrollView>

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
                                        setContPrecio={setContPrecio}
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