import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { ContratoResponse } from '../interfaces/contratoInterfaces';

interface Props {
    contrato: ContratoResponse;
}

export const ContratoCard = ( {contrato} : Props) => {

    const navigation = useNavigation();

    return(
        <TouchableOpacity
            onPress={ () => (navigation as any).navigate("FormContrato",{...contrato}) }
        >
            <View
                style={ style.cardContainer }
            >
                <Text
                    style={ style.title }
                >
                    { `Usuario:\n${contrato.usuario}\n` }
                </Text>
                <Text
                    style={ style.title }
                >
                    { `Fecha:\n${(contrato.fecha_contratacion || '').split('T')[0]}\n` }
                </Text>
                <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
                    {contrato.imagen1 ? <Image style={style.thumb} source={{ uri: `data:image/jpeg;base64,${contrato.imagen1}` }} /> : null}
                    {contrato.imagen2 ? <Image style={style.thumb} source={{ uri: `data:image/jpeg;base64,${contrato.imagen2}` }} /> : null}
                    {contrato.imagen3 ? <Image style={style.thumb} source={{ uri: `data:image/jpeg;base64,${contrato.imagen3}` }} /> : null}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 200,
        width: 140,
        marginBottom: 25,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "violet",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        paddingHorizontal: 8
    },
    title:{
        marginTop: 6,
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center"
    },
    thumb:{
        width: 30,
        height: 30,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.3)'
    }
});
