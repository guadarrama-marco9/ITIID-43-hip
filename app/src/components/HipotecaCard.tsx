import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { HipotecaResponse } from '../interfaces/hipotecaInterfaces';

interface Props {
  hipoteca: HipotecaResponse;
}

export const HipotecaCard = ({ hipoteca }: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => (navigation as any).navigate("FormHipoteca", { ...hipoteca })}>
      <View style={style.cardContainer}>
        <ImageBackground source={require('../img/1.jpg')} style={style.bg} resizeMode="cover">
          <View style={style.overlay} />
          <View style={style.content}>
            <Text style={style.title}>{`Solicitante:\n${hipoteca.nombre_solicitante}\n`}</Text>
            <Text style={style.title}>{`Fecha Nac.:\n${(hipoteca.fecha_nacimiento || '').split('T')[0]}\n`}</Text>
            <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
              {hipoteca.ine_solicitante ? <Image style={style.thumb} source={{ uri: `data:image/jpeg;base64,${hipoteca.ine_solicitante}` }} /> : null}
              {hipoteca.comprobante_ingresos ? <Image style={style.thumb} source={{ uri: `data:image/jpeg;base64,${hipoteca.comprobante_ingresos}` }} /> : null}
              {hipoteca.fotografia_propiedad ? <Image style={style.thumb} source={{ uri: `data:image/jpeg;base64,${hipoteca.fotografia_propiedad}` }} /> : null}
            </View>
          </View>
        </ImageBackground>
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
    backgroundColor: "#000",
    paddingHorizontal: 0
  },
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)'
  },
  content: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  title:{
    marginTop: 6,
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  },
  thumb:{
    width: 30,
    height: 30,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.4)'
  }
});
