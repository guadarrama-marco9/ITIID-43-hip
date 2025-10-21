import { useEffect, useState } from "react";
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { pandorApi } from "../api/pandoraApi";
import { ContratoResponse } from "../interfaces/contratoInterfaces";
import { FormContratoData } from "./useContratoForm";

interface UseContratoApi{
    isLoading:      boolean;
    listContrato:   ContratoResponse;
    loadContratos:  () => void;
    createContrato: (data: FormContratoData) => Promise<any>;
    updateContrato: (data: FormContratoData) => Promise<any>;
    deleteContrato: (data: FormContratoData) => Promise<any>;
}

export const useContratoApi = (): UseContratoApi => {
    const [ isLoading, setIsLoading ] = useState<boolean>( false );
    const [ listContrato, setListContrato ] = useState<ContratoResponse>({} as ContratoResponse);

    const envHost = (process as any)?.env?.EXPO_PUBLIC_API_HOST as string | undefined;
    const envPort = (process as any)?.env?.EXPO_PUBLIC_API_PORT as string | undefined;
    const dbgHost = (Constants as any)?.manifest?.debuggerHost || (Constants as any)?.expoConfig?.hostUri;
    let host = envHost || (typeof dbgHost === 'string' ? dbgHost.split(':')[0] : 'localhost');
    if (Platform.OS === 'android' && (host === 'localhost' || host === '127.0.0.1')) {
        host = '10.0.2.2';
    }
    const port = Number(envPort || 3000);
    const apiUrl: string = `http://${host}:${port}/api/dsm43/contratos`;

    const loadContratos = async () => {
        setIsLoading( true );
        try{
            console.log('GET', apiUrl);
            const response = await pandorApi.get<ContratoResponse>( apiUrl );
            console.log('GET ok', response.status);
            setListContrato( response.data );
        }catch(err: any){
            console.error('GET error', err?.response?.status, err?.response?.data || err?.message);
            throw new Error(`GET contratos falló: ${err?.response?.status} ${JSON.stringify(err?.response?.data) || err?.message}`);
        }finally{
            setIsLoading( false );
        }
    }

    useEffect(() => {
        loadContratos();
    },[]);

    const createContrato = async ( data: FormContratoData ) => {
        const dataBody = {
            usuario: data.usuario,
            fecha_contratacion: data.fecha_contratacion,
            imagen1: data.imagen1,
            imagen2: data.imagen2,
            imagen3: data.imagen3,
        };
        try{
            console.log('POST', apiUrl, dataBody);
            const response = await pandorApi.post(apiUrl, dataBody);
            console.log('POST ok', response.data);
        }catch(error){
            console.log(error);
        }
    }

    const updateContrato = async ( data: FormContratoData ) => {
        const dataBody = {
            usuario: data.usuario,
            fecha_contratacion: data.fecha_contratacion,
            imagen1: data.imagen1,
            imagen2: data.imagen2,
            imagen3: data.imagen3,
        };
        try{
            const url = `${apiUrl}/${data.id_contrato}`;
            console.log('PATCH', url, dataBody);
            const response = await pandorApi.patch(url, dataBody);
            console.log('PATCH ok', response.status, response.data);
            return response.data;
        }catch(err: any){
            console.error('PATCH error', err?.response?.status, err?.response?.data || err?.message);
            throw new Error(`PATCH contrato falló: ${err?.response?.status} ${JSON.stringify(err?.response?.data) || err?.message}`);
        }
    }

    const deleteContrato = async ( data: FormContratoData ) => {
        try{
            const url = `${apiUrl}/${data.id_contrato}`;
            console.log('DELETE', url);
            const response = await pandorApi.delete(url);
            console.log('DELETE ok', response.status);
            return response.data;
        }catch(err: any){
            console.error('DELETE error', err?.response?.status, err?.response?.data || err?.message);
            throw new Error(`DELETE contrato falló: ${err?.response?.status} ${JSON.stringify(err?.response?.data) || err?.message}`);
        }
    }

    return { isLoading, listContrato, loadContratos, createContrato, updateContrato, deleteContrato };
}

