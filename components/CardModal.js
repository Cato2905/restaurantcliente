import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from '../styles/styles'
import TouOpasLarge from './common/buttons/TouOpasLarge'
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import IconFontisto from 'react-native-vector-icons/Fontisto'
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons'


const CardModal = ({ item,  verSuma}) => {

    const [contSuma, setContSuma] = useState(item.cantidadPromo)

    useEffect(() => {

        var suma = item.precio * item.cantidadPromo
        verSuma(suma, item.indexDoc, contSuma)
        

    }, [contSuma])



    return (

        <View style={[styles.cardPerfil, { borderRadius: 0, flexDirection: 'row', }]}>
            <View style={{ width: "30%", backgroundColor: "red", height: 100 }}>
                <Image source={{ uri: `${item.imagen}` }}
                    style={{ width: "100%", height: "100%", resizeMode: 'stretch' }} />
            </View>
            <View style={{ width: "50%", height: 100 }}>
                <Text style={[styles.textSubTitle, { textAlign: 'center', }]}>
                    {item.cantidadPromo}
                </Text>
                <Text style={[styles.textSubTitle, { textAlign: 'center', borderTopWidth: 1, borderColor: "#BBB" }]}>
                    Precio: ${item.precio * item.cantidadPromo}
                </Text>

            </View>
            <View style={{ width: "20%", height: 100 }}>
                <View style={{ width: "100%", height: "50%", flexDirection: 'row' }}>

                    <TouchableOpacity
                        onPress={() => setContSuma(item.cantidadPromo === 0 ? 0 : item.cantidadPromo - 1)}
                        style={{ width: "50%", height: "100%", justifyContent: 'center', alignItems: 'center', elevation: 1, }}
                    >
                        <IconCommunity
                            name="numeric-negative-1"
                            size={35}
                            color="#148D6F"
                            style={{ alignSelf: "center" }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setContSuma(item.cantidadPromo + 1)}
                        style={{ width: "50%", height: "100%", justifyContent: 'center', alignItems: 'center', elevation: 1, }}
                    >
                        <IconCommunity
                            name="numeric-positive-1"
                            size={40}
                            color="#148D6F"
                            style={{ alignSelf: "center" }}
                        />
                    </TouchableOpacity>

                </View>

                <View style={{ width: "100%", height: "50%", justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={[styles.textTitle]}>
                        {item.cantidadPromo}
                    </Text>
                </View>

            </View>
        </View>


    )
}

export default CardModal