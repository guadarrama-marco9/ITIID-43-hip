import React, { useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, ImageBackground } from 'react-native';
import { appTheme } from '../../themes/appTheme';
import { BtnTouch } from '../../components/BtnTouch';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackHipoteca } from '../../navigator/HipotecaNavigator';
import { useHipotecaForm } from '../../hooks/useHipotecaForm';
import { useImagePicker } from '../../hooks/useImagePicker';
import type { ColorValue } from 'react-native'; 

interface Props extends StackScreenProps<RootStackHipoteca, "FormHipoteca">{};

export const FormHipoteca = ({ navigation, route }: Props) => {
  const { state, handleInputChange, handleSave, handleUpdate, handleDelete, errors, canSubmit, isSubmitting } = useHipotecaForm();

  const img1 = useImagePicker();
  const img2 = useImagePicker();
  const img3 = useImagePicker();
  const img4 = useImagePicker();
  const img5 = useImagePicker();
  const img6 = useImagePicker();

  useEffect(() => {
    const h = route.params;
    handleInputChange("id_hipoteca", h.id_hipoteca);
    handleInputChange("nombre_solicitante", h.nombre_solicitante);
    handleInputChange("estado_civil", h.estado_civil);
    handleInputChange("fecha_nacimiento", h.fecha_nacimiento);
    handleInputChange("ingreso_mensual", h.ingreso_mensual);
    handleInputChange("domicilio", h.domicilio);
    handleInputChange("empleador", h.empleador);
    handleInputChange("antiguedad_laboral", h.antiguedad_laboral);
    handleInputChange("monto_solicitado", h.monto_solicitado);
    handleInputChange("plazo_pago", h.plazo_pago);
    handleInputChange("propiedad_financiar", h.propiedad_financiar);
    handleInputChange("valor_inmueble", h.valor_inmueble);
    handleInputChange("aval_coacreditado", h.aval_coacreditado);
    handleInputChange("referencias_personales", h.referencias_personales);
    handleInputChange("cuenta_bancaria", h.cuenta_bancaria);
    handleInputChange("firma_digital", h.firma_digital);
    handleInputChange("ine_solicitante", h.ine_solicitante);
    handleInputChange("comprobante_ingresos", h.comprobante_ingresos);
    handleInputChange("avaluo_inmueble", h.avaluo_inmueble);
    handleInputChange("predial_escritura", h.predial_escritura);
    handleInputChange("comprobante_domicilio", h.comprobante_domicilio);
    handleInputChange("fotografia_propiedad", h.fotografia_propiedad);
  },[]);

  useEffect(() => { img1.imagen64 && handleInputChange("ine_solicitante", img1.imagen64); },[img1.jpg]);
  useEffect(() => { img2.imagen64 && handleInputChange("comprobante_ingresos", img2.imagen64); },[img2.imagen64]);
  useEffect(() => { img3.imagen64 && handleInputChange("avaluo_inmueble", img3.imagen64); },[img3.imagen64]);
  useEffect(() => { img4.imagen64 && handleInputChange("predial_escritura", img4.imagen64); },[img4.imagen64]);
  useEffect(() => { img5.imagen64 && handleInputChange("comprobante_domicilio", img5.imagen64); },[img5.imagen64]);
  useEffect(() => { img6.imagen64 && handleInputChange("fotografia_propiedad", img6.imagen64); },[img6.imagen64]);

  return (
    <ImageBackground source={require('../../img/car.jpg')} style={{ flex: 1 }} resizeMode="cover">
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }} keyboardShouldPersistTaps="handled">
        <View style={{ width: '100%', minHeight: '100%', alignItems: 'center', alignContent: 'center', backgroundColor: 'rgba(166, 150, 124, 0.39)' }}>
          <Text style={ appTheme.title }>Crédito Hipotecario</Text>
          {(state.id_hipoteca != 0) && (
            <BtnTouch titulo={ isSubmitting ? 'Borrando...' : 'Borrar'} color={ isSubmitting ? 'gray' : 'red' } action={ async () => { if (isSubmitting) return; const ok = await handleDelete(); if (ok) navigation.popToTop(); }} />
          )}
          <View style={ appTheme.container }>
        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 20,backgroundColor: "orange" }}>Nombre del solicitante</Text>
        <TextInput style={ appTheme.textInput } placeholder='Nombre del solicitante' value={ state.nombre_solicitante } onChangeText={(v)=>handleInputChange('nombre_solicitante',v)} />
        { errors?.nombre_solicitante ? (<Text style={{ color: 'red', alignSelf: 'flex-start', marginHorizontal: 5 }}>{errors.nombre_solicitante}</Text>) : null }

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "grey" }}>Estado civil</Text>
        <TextInput style={ appTheme.textInput } placeholder='Estado civil' value={ state.estado_civil } onChangeText={(v)=>handleInputChange('estado_civil',v)} />

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "orange" }}>Fecha de nacimiento (YYYY-MM-DD)</Text>
        <TextInput style={ appTheme.textInput } placeholder='Fecha de nacimiento' value={ state.fecha_nacimiento } onChangeText={(v)=>handleInputChange('fecha_nacimiento',v)} />

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5, backgroundColor: "grey" }}>Ingreso mensual</Text>
        <TextInput style={ appTheme.textInput } placeholder='Ingreso mensual' value={ state.ingreso_mensual } onChangeText={(v)=>handleInputChange('ingreso_mensual',v)} />

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5, backgroundColor: "orange" }}>Domicilio</Text>
        <TextInput style={ appTheme.textInput } placeholder='Domicilio' value={ state.domicilio } onChangeText={(v)=>handleInputChange('domicilio',v)} />

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "grey" }}>Empleador</Text>
        <TextInput style={ appTheme.textInput } placeholder='Empleador' value={ state.empleador } onChangeText={(v)=>handleInputChange('empleador',v)} />

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "orange" }}>Antigüedad laboral</Text>
        <TextInput style={ appTheme.textInput } placeholder='Antigüedad laboral' value={ state.antiguedad_laboral } onChangeText={(v)=>handleInputChange('antiguedad_laboral',v)} />

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "grey" }}>Monto solicitado</Text>
        <TextInput style={ appTheme.textInput } placeholder='Monto solicitado' value={ state.monto_solicitado } onChangeText={(v)=>handleInputChange('monto_solicitado',v)} />

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "orange" }}>Plazo de pago</Text>
        <TextInput style={ appTheme.textInput } placeholder='Plazo de pago' value={ state.plazo_pago } onChangeText={(v)=>handleInputChange('plazo_pago',v)} />

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "grey" }}>Propiedad a financiar</Text>
        <TextInput style={ appTheme.textInput } placeholder='Propiedad a financiar' value={ state.propiedad_financiar } onChangeText={(v)=>handleInputChange('propiedad_financiar',v)} />

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "orange" }}>Valor del inmueble</Text>
        <TextInput style={ appTheme.textInput } placeholder='Valor del inmueble' value={ state.valor_inmueble } onChangeText={(v)=>handleInputChange('valor_inmueble',v)} />

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "grey" }}>Aval o coacreditado</Text>
        <TextInput style={ appTheme.textInput } placeholder='Aval o coacreditado' value={ state.aval_coacreditado } onChangeText={(v)=>handleInputChange('aval_coacreditado',v)} />

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "orange" }}>Referencias personales</Text>
        <TextInput style={ appTheme.textInput } placeholder='Referencias personales' value={ state.referencias_personales } onChangeText={(v)=>handleInputChange('referencias_personales',v)} />

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "grey" }}>Cuenta bancaria</Text>
        <TextInput style={ appTheme.textInput } placeholder='Cuenta bancaria' value={ state.cuenta_bancaria } onChangeText={(v)=>handleInputChange('cuenta_bancaria',v)} />

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "orange" }}>Firma digital</Text>
        <TextInput style={ appTheme.textInput } placeholder='Firma digital (base64 opcional)' value={ state.firma_digital } onChangeText={(v)=>handleInputChange('firma_digital',v)} />

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "grey" }}>INE solicitante</Text>
        <BtnTouch titulo={ state.ine_solicitante ? 'Cambiar INE' : 'Agregar INE' } color='#ab4f25ff' action={() => img1.pickImage()} />
        { state.ine_solicitante ? (<Image style={{ width: 200, height: 120, borderRadius: 8, alignSelf: 'center' }} source={{ uri: `data:image/jpeg;base64,${state.ine_solicitante}` }} />) : null }

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "orange" }}>Comprobante de ingresos</Text>
        <BtnTouch titulo={ state.comprobante_ingresos ? 'Cambiar comprobante' : 'Agregar comprobante' } color='#ab4f25ff' action={() => img2.pickImage()} />
        { state.comprobante_ingresos ? (<Image style={{ width: 200, height: 120, borderRadius: 8, alignSelf: 'center' }} source={{ uri: `data:image/jpeg;base64,${state.comprobante_ingresos}` }} />) : null }

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "grey" }}>Avalúo del inmueble</Text>
        <BtnTouch titulo={ state.avaluo_inmueble ? 'Cambiar avalúo' : 'Agregar avalúo' } color='#ab4f25ff' action={() => img3.pickImage()} />
        { state.avaluo_inmueble ? (<Image style={{ width: 200, height: 120, borderRadius: 8, alignSelf: 'center' }} source={{ uri: `data:image/jpeg;base64,${state.avaluo_inmueble}` }} />) : null }

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "orange" }}>Predial o escritura</Text>
        <BtnTouch titulo={ state.predial_escritura ? 'Cambiar documento' : 'Agregar documento' } color='#ab4f25ff' action={() => img4.pickImage()} />
        { state.predial_escritura ? (<Image style={{ width: 200, height: 120, borderRadius: 8, alignSelf: 'center' }} source={{ uri: `data:image/jpeg;base64,${state.predial_escritura}` }} />) : null }

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "grey" }}>Comprobante de domicilio</Text>
        <BtnTouch titulo={ state.comprobante_domicilio ? 'Cambiar comprobante' : 'Agregar comprobante' } color='#ab4f25ff' action={() => img5.pickImage()} />
        { state.comprobante_domicilio ? (<Image style={{ width: 200, height: 120, borderRadius: 8, alignSelf: 'center' }} source={{ uri: `data:image/jpeg;base64,${state.comprobante_domicilio}` }} />) : null }

        <Text style={{ ...appTheme.title, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 5,backgroundColor: "orange" }}>Fotografía de la propiedad</Text>
        <BtnTouch titulo={ state.fotografia_propiedad ? 'Cambiar fotografía' : 'Agregar fotografía' } color='#ab7325ff' action={() => img6.pickImage()} />
        { state.fotografia_propiedad ? (<Image style={{ width: 200, height: 120, borderRadius: 8, alignSelf: 'center' }} source={{ uri: `data:image/jpeg;base64,${state.fotografia_propiedad}` }} />) : null }

        { state.id_hipoteca == 0 ? (
          <BtnTouch titulo={ isSubmitting ? 'Guardando...' : 'Guardar' } color={ (!canSubmit || isSubmitting) ? 'gray' : '#ab4f25ff' } action={ async () => { if (!canSubmit || isSubmitting) return; const ok = await handleSave(); if (ok) navigation.popToTop(); }} />
        ) : (
          <BtnTouch titulo={ isSubmitting ? 'Actualizando...' : 'Actualizar' } color={ (!canSubmit || isSubmitting) ? 'gray' : '#ab4f25ff' } action={ async () => { if (!canSubmit || isSubmitting) return; const ok = await handleUpdate(); if (ok) navigation.popToTop(); }} />
        ) }
            <BtnTouch titulo='Regresar' color={ isSubmitting ? 'gray' : '#9b8b74ff' } action={() => { if (!isSubmitting) navigation.popToTop(); }} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
