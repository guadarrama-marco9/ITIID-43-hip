import { IsString, IsNumber, MinLength, MaxLength, IsOptional } from "class-validator";

export class UpdateHipoteca {
    @IsString()
    @MaxLength(255)
    @MinLength(3)
    @IsOptional()
    nombre_solicitante?: string;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    estado_civil?: string;

    @IsString()
    @IsOptional()
    fecha_nacimiento?: string;

    @IsString()
    @IsOptional()
    ingreso_mensual?: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    domicilio?: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    empleador?: string;

    @IsString()
    @IsOptional()
    antiguedad_laboral?: string;

    @IsString()
    @IsOptional()
    monto_solicitado?: string;

    @IsString()
    @IsOptional()
    plazo_pago?: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    propiedad_financiar?: string;

    @IsString()
    @IsOptional()
    valor_inmueble?: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    aval_coacreditado?: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    referencias_personales?: string;

    @IsString()
    @IsOptional()
    cuenta_bancaria?: string;

    @IsString()
    @IsOptional()
    firma_digital?: string;

    @IsString()
    @IsOptional()
    ine_solicitante?: string;

    @IsString()
    @IsOptional()
    comprobante_ingresos?: string;

    @IsString()
    @IsOptional()
    avaluo_inmueble?: string;

    @IsString()
    @IsOptional()
    predial_escritura?: string;

    @IsString()
    @IsOptional()
    comprobante_domicilio?: string;

    @IsString()
    @IsOptional()
    fotografia_propiedad?: string;
}