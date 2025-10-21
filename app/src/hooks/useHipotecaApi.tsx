import { useEffect, useState } from "react";
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { pandorApi } from "../api/pandoraApi";
import { HipotecaResponse } from "../interfaces/hipotecaInterfaces";
import { FormHipotecaData } from "./useHipotecaForm";

interface UseHipotecaApi{
  isLoading: boolean;
  listHipoteca: Record<number, HipotecaResponse>;
  loadHipotecas: () => void;
  createHipoteca: (data: FormHipotecaData) => Promise<any>;
  updateHipoteca: (data: FormHipotecaData) => Promise<any>;
  deleteHipoteca: (data: FormHipotecaData) => Promise<any>;
}

export const useHipotecaApi = (): UseHipotecaApi => {
  const [ isLoading, setIsLoading ] = useState<boolean>( false );
  const [ listHipoteca, setListHipoteca ] = useState<Record<number, HipotecaResponse>>({});

  const envHost = (process as any)?.env?.EXPO_PUBLIC_API_HOST as string | undefined;
  const envPort = (process as any)?.env?.EXPO_PUBLIC_API_PORT as string | undefined;
  const dbgHost = (Constants as any)?.manifest?.debuggerHost || (Constants as any)?.expoConfig?.hostUri;
  let host = envHost || (typeof dbgHost === 'string' ? dbgHost.split(':')[0] : 'localhost');
  if (Platform.OS === 'android' && (host === 'localhost' || host === '127.0.0.1')) {
    host = '10.0.2.2';
  }
  const port = Number(envPort || 3000);
  const apiUrl: string = `http://${host}:${port}/api/dsm43/hipotecas`;

  const loadHipotecas = async () => {
    setIsLoading( true );
    try{
      const response = await pandorApi.get<HipotecaResponse[]>( apiUrl );
      const byId: Record<number, HipotecaResponse> = {};
      (response.data || []).forEach((h) => { byId[h.id_hipoteca] = h; });
      setListHipoteca( byId );
    }catch(err: any){
      console.error('GET hipotecas error', err?.response?.status, err?.response?.data || err?.message);
      throw new Error(`GET hipotecas falló: ${err?.response?.status} ${JSON.stringify(err?.response?.data) || err?.message}`);
    }finally{
      setIsLoading( false );
    }
  }

  useEffect(() => {
    loadHipotecas();
  },[]);

  const mapBody = (data: FormHipotecaData) => ({
    nombre_solicitante: data.nombre_solicitante,
    estado_civil: data.estado_civil,
    fecha_nacimiento: data.fecha_nacimiento,
    ingreso_mensual: data.ingreso_mensual,
    domicilio: data.domicilio,
    empleador: data.empleador,
    antiguedad_laboral: data.antiguedad_laboral,
    monto_solicitado: data.monto_solicitado,
    plazo_pago: data.plazo_pago,
    propiedad_financiar: data.propiedad_financiar,
    valor_inmueble: data.valor_inmueble,
    aval_coacreditado: data.aval_coacreditado,
    referencias_personales: data.referencias_personales,
    cuenta_bancaria: data.cuenta_bancaria,
    firma_digital: data.firma_digital,
    ine_solicitante: data.ine_solicitante,
    comprobante_ingresos: data.comprobante_ingresos,
    avaluo_inmueble: data.avaluo_inmueble,
    predial_escritura: data.predial_escritura,
    comprobante_domicilio: data.comprobante_domicilio,
    fotografia_propiedad: data.fotografia_propiedad,
  });

  const createHipoteca = async ( data: FormHipotecaData ) => {
    try{
      const response = await pandorApi.post(apiUrl, mapBody(data));
      return response.data;
    }catch(err:any){
      console.error('POST hipoteca error', err?.response?.status, err?.response?.data || err?.message);
      throw err;
    }
  }

  const updateHipoteca = async ( data: FormHipotecaData ) => {
    try{
      const url = `${apiUrl}/${data.id_hipoteca}`;
      const response = await pandorApi.patch(url, mapBody(data));
      return response.data;
    }catch(err:any){
      console.error('PATCH hipoteca error', err?.response?.status, err?.response?.data || err?.message);
      throw err;
    }
  }

  const deleteHipoteca = async ( data: FormHipotecaData ) => {
    try{
      const url = `${apiUrl}/${data.id_hipoteca}`;
      const response = await pandorApi.delete(url);
      return response.data;
    }catch(err:any){
      console.error('DELETE hipoteca error', err?.response?.status, err?.response?.data || err?.message);
      throw err;
    }
  }

  return { isLoading, listHipoteca, loadHipotecas, createHipoteca, updateHipoteca, deleteHipoteca };
}
