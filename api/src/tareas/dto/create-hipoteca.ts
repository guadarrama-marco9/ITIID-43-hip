import { IsString, IsNumber, MinLength, MaxLength } from "class-validator";

export class CreateHipoteca {
    @IsString()
    @MaxLength(255)
    @MinLength(3)
    nombre_solicitante: string;

    @IsString()
    @MaxLength(50)
    estado_civil: string;

    @IsString()
    fecha_nacimiento: string;

    @IsString()
    ingreso_mensual: string;

    @IsString()
    @MaxLength(255)
    domicilio: string;

    @IsString()
    @MaxLength(255)
    empleador: string;

    @IsString()
    antiguedad_laboral: string;

    @IsString()
    monto_solicitado: string;

    @IsString()
    plazo_pago: string;

    @IsString()
    @MaxLength(255)
    propiedad_financiar: string;

    @IsString()
    valor_inmueble: string;

    @IsString()
    @MaxLength(255)
    aval_coacreditado: string;

    @IsString()
    @MaxLength(255)
    referencias_personales: string;

    @IsString()
    cuenta_bancaria: string;

    @IsString()
    firma_digital: string;

    @IsString()
    ine_solicitante: string;

    @IsString()
    comprobante_ingresos: string;

    @IsString()
    avaluo_inmueble: string;

    @IsString()
    predial_escritura: string;

    @IsString()
    comprobante_domicilio: string;

    @IsString()
    fotografia_propiedad: string;
}