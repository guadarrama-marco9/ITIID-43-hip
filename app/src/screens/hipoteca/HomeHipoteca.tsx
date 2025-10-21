import React, { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, ImageBackground } from 'react-native';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { appTheme } from '../../themes/appTheme';
import { useHipotecaApi } from '../../hooks/useHipotecaApi';
import { BtnTouch } from '../../components/BtnTouch';
import { HipotecaResponse } from '../../interfaces/hipotecaInterfaces';
import { HipotecaCard } from '../../components/HipotecaCard';

export const HomeHipoteca = () => {
  const { isLoading, loadHipotecas, listHipoteca } = useHipotecaApi();
  const focused = useIsFocused();
  const navigation = useNavigation();

  const create: HipotecaResponse = {
    id_hipoteca: 0,
    nombre_solicitante: "",
    estado_civil: "",
    fecha_nacimiento: "",
    ingreso_mensual: "",
    domicilio: "",
    empleador: "",
    antiguedad_laboral: "",
    monto_solicitado: "",
    plazo_pago: "",
    propiedad_financiar: "",
    valor_inmueble: "",
    aval_coacreditado: "",
    referencias_personales: "",
    cuenta_bancaria: "",
    firma_digital: "",
    ine_solicitante: "",
    comprobante_ingresos: "",
    avaluo_inmueble: "",
    predial_escritura: "",
    comprobante_domicilio: "",
    fotografia_propiedad: "",
  };

  useEffect(() => {
    (!isLoading) && loadHipotecas();
  },[focused]);

  return (
    <ImageBackground source={require('../../img/4.jpg')} style={{ flex: 1 }} resizeMode="cover">
      <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.35)' }}>
        <View style={ appTheme.marginGlobal }>
          <FlatList<HipotecaResponse>
            data={ Object.values(listHipoteca) as HipotecaResponse[] }
            keyExtractor={ (item) => "#"+item.id_hipoteca }
            ListHeaderComponent={(
              <View style={ appTheme.container }>
                <Text style={ appTheme.title }>Lista de Créditos Hipotecarios</Text>
                <BtnTouch titulo='Crear crédito' color='#ab4f25ff' action={() => (navigation as any).navigate("FormHipoteca", { ...create })} />
              </View>
            )}
            refreshControl={(
              <RefreshControl refreshing={isLoading} onRefresh={ loadHipotecas } colors={[ "#ab4f25ff", "#8b7b64ff", "black" ]} progressBackgroundColor="#E5E7EB" />
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({ item }: { item: HipotecaResponse }) => (
              <HipotecaCard hipoteca={ item } />
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
