import { useReducer, useState } from "react";
import { useContratoApi } from "./useContratoApi";

export interface FormContratoData{
    id_contrato:           number;
    usuario:               string;
    fecha_contratacion:    string;
    imagen1:               string;
    imagen2:               string;
    imagen3:               string;
}

export interface UseContratoForm{
    state:              FormContratoData;
    handleInputChange:  ( fieldName: keyof FormContratoData, value: string | number ) => void;
    handleSave:         () => Promise<boolean>;
    handleUpdate:       () => Promise<boolean>;
    handleDelete:       () => Promise<boolean>;
    errors:             Partial<Record<keyof Omit<FormContratoData, 'id_contrato' | 'imagen1' | 'imagen2' | 'imagen3'>, string>>;
    isSubmitting:       boolean;
    canSubmit:          boolean;
    lastError:          string | null;
}

export const useContratoForm = (): UseContratoForm => {

    const { createContrato, updateContrato, deleteContrato } = useContratoApi();

    const initialForm: FormContratoData = {
        id_contrato: 0,
        usuario: "",
        fecha_contratacion: "",
        imagen1: "",
        imagen2: "",
        imagen3: "",
    };

    type Action = { type: "handleInputChange", payload: { fieldName: keyof FormContratoData, value: string | number } };

    const formReducer = ( state: FormContratoData, action: Action ) => {
        switch( action.type ){
            case "handleInputChange":
                return {
                    ...state,
                    [action.payload.fieldName] : action.payload.value
                }
        }
    }

    const [ state, dispatch ] = useReducer(formReducer, initialForm);
    const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
    const [ lastError, setLastError ] = useState<string | null>(null);

    let errors: UseContratoForm["errors"] = {};
    const canSubmit = true;

    const handleInputChange = ( fieldName: keyof FormContratoData, value: string | number ) => {
        dispatch({ type: "handleInputChange", payload: { fieldName, value } });
    }

    const handleSave = async (): Promise<boolean> => {
        if (!canSubmit || isSubmitting) return false;
        setIsSubmitting(true);
        try{
            console.log('[handleSave] payload', state);
            const resp = await createContrato(state);
            console.log(resp);
            setLastError(null);
            return true;
        }catch(e){
            const message = (e as any)?.message || 'Error desconocido';
            console.error('[handleSave] error', message);
            setLastError(message);
            return false;
        }finally{
            setIsSubmitting(false);
        }
    }

    const handleUpdate = async (): Promise<boolean> => {
        if (!canSubmit || isSubmitting || state.id_contrato == 0) return false;
        setIsSubmitting(true);
        try{
            console.log('[handleUpdate] id', state.id_contrato, 'payload', state);
            const resp = await updateContrato(state);
            console.log(resp);
            setLastError(null);
            return true;
        }catch(e){
            const message = (e as any)?.message || 'Error desconocido';
            console.error('[handleUpdate] error', message);
            setLastError(message);
            return false;
        }finally{
            setIsSubmitting(false);
        }
    }

    const handleDelete = async (): Promise<boolean> => {
        if (isSubmitting || state.id_contrato == 0) return false;
        setIsSubmitting(true);
        try{
            await deleteContrato(state);
            setLastError(null);
            return true;
        }catch(e){
            const message = (e as any)?.message || 'Error desconocido';
            setLastError(message);
            return false;
        }finally{
            setIsSubmitting(false);
        }
    }

    return { state, handleInputChange, handleSave, handleUpdate, handleDelete, errors, isSubmitting, canSubmit, lastError };
}

