import React, { useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView } from 'react-native';
import { appTheme } from '../../themes/appTheme';
import { BtnTouch } from '../../components/BtnTouch';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackContrato } from '../../navigator/ContratoNavigator';
import { useContratoForm } from '../../hooks/useContratoForm';
import { useImagePicker } from '../../hooks/useImagePicker';

interface Props extends StackScreenProps<RootStackContrato, "FormContrato">{};

export const FormContrato = ( { navigation, route } :Props ) => {

    const { state, handleInputChange, handleSave, handleUpdate, handleDelete, errors, canSubmit, isSubmitting, lastError } = useContratoForm();

    const img1 = useImagePicker();
    const img2 = useImagePicker();
    const img3 = useImagePicker();

    useEffect(() => {
        const contrato = route.params;
        handleInputChange("id_contrato", contrato.id_contrato);
        handleInputChange("usuario", contrato.usuario);
        handleInputChange("fecha_contratacion", contrato.fecha_contratacion);
        handleInputChange("imagen1", contrato.imagen1);
        handleInputChange("imagen2", contrato.imagen2);
        handleInputChange("imagen3", contrato.imagen3);
    },[]);

    useEffect(() => {
        (img1.imagen64) && handleInputChange("imagen1", img1.imagen64);
    },[img1.imagen64]);

    useEffect(() => {
        (img2.imagen64) && handleInputChange("imagen2", img2.imagen64);
    },[img2.imagen64]);

    useEffect(() => {
        (img3.imagen64) && handleInputChange("imagen3", img3.imagen64);
    },[img3.imagen64]);

    return(
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 24, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}
            keyboardShouldPersistTaps="handled"
        >
            <Text
                style={ appTheme.title }
            >
                Formulario de Contrato
            </Text>
            { ( state.id_contrato != 0 ) && (
                <BtnTouch
                    titulo={ isSubmitting ? 'Borrando...' : 'Borrar Contrato' }
                    color={ isSubmitting ? 'gray' : 'red' }
                    action={ async () => {
                        if (isSubmitting) return;
                        const ok = await handleDelete();
                        if (ok) navigation.popToTop();
                    }}
                />)
            }
            <View
                style={ appTheme.container }
            >
                <Text
                    style={{
                        ...appTheme.title,
                        fontSize: 18,
                        textAlign: "left",
                        alignSelf: "flex-start",
                        marginHorizontal: 5,
                        marginTop: 20,
                        color:"orange"
                    }}
                >
                    Usuario
                </Text>
                <TextInput
                    style={ appTheme.textInput }
                    placeholder='Usuario'
                    value={ state.usuario }
                    onChangeText={ (value) => handleInputChange("usuario",value) }
                />
                { errors?.usuario ? (
                    <Text style={{ color: 'red', alignSelf: 'flex-start', marginHorizontal: 5 }}>
                        {errors.usuario}
                    </Text>
                ) : null }
                <Text
                    style={{
                        ...appTheme.title,
                        fontSize: 18,
                        textAlign: "left",
                        alignSelf: "flex-start",
                        marginHorizontal: 5,
                        marginTop: 5,
                        color:"grey"
                    }}
                >
                    Fecha de contratación (YYYY-MM-DD)
                </Text>
                <TextInput
                    style={ appTheme.textInput }
                    placeholder='Fecha de contratación'
                    value={ state.fecha_contratacion }
                    onChangeText={ (value) => handleInputChange("fecha_contratacion",value) }
                />
                { errors?.fecha_contratacion ? (
                    <Text style={{ color: 'red', alignSelf: 'flex-start', marginHorizontal: 5 }}>
                        {errors.fecha_contratacion}
                    </Text>
                ) : null }

                <Text
                    style={{
                        ...appTheme.title,
                        fontSize: 18,
                        textAlign: "left",
                        alignSelf: "flex-start",
                        marginHorizontal: 5,
                        marginTop: 5,
                        color:"orange"
                    }}
                >
                    Imágenes (3)
                </Text>

                <BtnTouch
                    titulo={ state.imagen1 ? 'Cambiar Imagen 1' : 'Agregar Imagen 1' }
                    color='grey'
                    action={ () => img1.pickImage() }
                />
                { state.imagen1 ? (
                    <Image 
                        style={{ width: 200, height: 120, borderRadius: 8, alignSelf: 'center' }}
                        source={{ uri: `data:image/jpeg;base64,${state.imagen1}` }}
                    />
                ) : null }

                <BtnTouch
                    titulo={ state.imagen2 ? 'Cambiar Imagen 2' : 'Agregar Imagen 2' }
                    color='green'
                    action={ () => img2.pickImage() }
                />
                { state.imagen2 ? (
                    <Image 
                        style={{ width: 200, height: 120, borderRadius: 8, alignSelf: 'center' }}
                        source={{ uri: `data:image/jpeg;base64,${state.imagen2}` }}
                    />
                ) : null }

                <BtnTouch
                    titulo={ state.imagen3 ? 'Cambiar Imagen 3' : 'Agregar Imagen 3' }
                    color='grey'
                    action={ () => img3.pickImage() }
                />
                { state.imagen3 ? (
                    <Image 
                        style={{ width: 200, height: 120, borderRadius: 8, alignSelf: 'center' }}
                        source={{ uri: `data:image/jpeg;base64,${state.imagen3}` }}
                    />
                ) : null }

                { state.id_contrato == 0 ? (
                    <BtnTouch
                        titulo={ isSubmitting ? 'Guardando...' : 'Guardar contrato' }
                        color={ (!canSubmit || isSubmitting) ? 'gray' : 'green' }
                        action={ async () => {
                            if (!canSubmit || isSubmitting) return;
                            const ok = await handleSave();
                            if (ok) navigation.popToTop();
                        }}
                    />
                ) : (
                    <BtnTouch
                        titulo={ isSubmitting ? 'Actualizando...' : 'Actualizar contrato' }
                        color={ (!canSubmit || isSubmitting) ? 'gray' : 'orange' }
                        action={ async () => {
                            if (!canSubmit || isSubmitting) return;
                            const ok = await handleUpdate();
                            if (ok) navigation.popToTop();
                        }}
                    />
                ) }
                <BtnTouch
                    titulo='Regresar'
                    color={ isSubmitting ? 'gray' : 'green' }
                    action={ () => { if (!isSubmitting) navigation.popToTop(); } }
                />
            </View>
        </ScrollView>
    );
}

