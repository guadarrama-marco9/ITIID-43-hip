import { useReducer, useState } from "react";
import { useHipotecaApi } from "./useHipotecaApi";

export interface FormHipotecaData{
  id_hipoteca: number;
  nombre_solicitante: string;
  estado_civil: string;
  fecha_nacimiento: string;
  ingreso_mensual: string;
  domicilio: string;
  empleador: string;
  antiguedad_laboral: string;
  monto_solicitado: string;
  plazo_pago: string;
  propiedad_financiar: string;
  valor_inmueble: string;
  aval_coacreditado: string;
  referencias_personales: string;
  cuenta_bancaria: string;
  firma_digital: string;
  ine_solicitante: string;
  comprobante_ingresos: string;
  avaluo_inmueble: string;
  predial_escritura: string;
  comprobante_domicilio: string;
  fotografia_propiedad: string;
}

export interface UseHipotecaForm{
  state: FormHipotecaData;
  handleInputChange: ( fieldName: keyof FormHipotecaData, value: string | number ) => void;
  handleSave: () => Promise<boolean>;
  handleUpdate: () => Promise<boolean>;
  handleDelete: () => Promise<boolean>;
  errors: Partial<Record<keyof Omit<FormHipotecaData, 'ine_solicitante' | 'comprobante_ingresos' | 'avaluo_inmueble' | 'predial_escritura' | 'comprobante_domicilio' | 'fotografia_propiedad'>, string>>;
  isSubmitting: boolean;
  canSubmit: boolean;
  lastError: string | null;
}

export const useHipotecaForm = (): UseHipotecaForm => {
  const { createHipoteca, updateHipoteca, deleteHipoteca } = useHipotecaApi();

  const initialForm: FormHipotecaData = {
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

  type Action = { type: "handleInputChange", payload: { fieldName: keyof FormHipotecaData, value: string | number } };

  const formReducer = ( state: FormHipotecaData, action: Action ) => {
    switch( action.type ){
      case "handleInputChange":
        return { ...state, [action.payload.fieldName]: action.payload.value };
    }
  }

  const [ state, dispatch ] = useReducer(formReducer, initialForm);
  const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
  const [ lastError, setLastError ] = useState<string | null>(null);

  let errors: UseHipotecaForm["errors"] = {};
  const canSubmit = true;

  const handleInputChange = ( fieldName: keyof FormHipotecaData, value: string | number ) => {
    dispatch({ type: "handleInputChange", payload: { fieldName, value } });
  }

  const handleSave = async (): Promise<boolean> => {
    if (!canSubmit || isSubmitting) return false;
    setIsSubmitting(true);
    try{
      await createHipoteca(state);
      setLastError(null);
      return true;
    }catch(e:any){
      setLastError(e?.message || 'Error');
      return false;
    }finally{
      setIsSubmitting(false);
    }
  }

  const handleUpdate = async (): Promise<boolean> => {
    if (!canSubmit || isSubmitting || state.id_hipoteca == 0) return false;
    setIsSubmitting(true);
    try{
      await updateHipoteca(state);
      setLastError(null);
      return true;
    }catch(e:any){
      setLastError(e?.message || 'Error');
      return false;
    }finally{
      setIsSubmitting(false);
    }
  }

  const handleDelete = async (): Promise<boolean> => {
    if (isSubmitting || state.id_hipoteca == 0) return false;
    setIsSubmitting(true);
    try{
      await deleteHipoteca(state);
      setLastError(null);
      return true;
    }catch(e:any){
      setLastError(e?.message || 'Error');
      return false;
    }finally{
      setIsSubmitting(false);
    }
  }

  return { state, handleInputChange, handleSave, handleUpdate, handleDelete, errors, isSubmitting, canSubmit, lastError };
}
