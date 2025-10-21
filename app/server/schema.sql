-- Crear tabla contratos
CREATE TABLE IF NOT EXISTS contratos (
  id_contrato SERIAL PRIMARY KEY,
  usuario VARCHAR(100) NOT NULL,
  fecha_contratacion DATE NOT NULL,
  imagen1 TEXT,
  imagen2 TEXT,
  imagen3 TEXT
);

-- Crear tabla creditos_hipotecarios
CREATE TABLE IF NOT EXISTS creditos_hipotecarios (
  id_hipoteca SERIAL PRIMARY KEY,
  nombre_solicitante VARCHAR(150) NOT NULL,
  estado_civil VARCHAR(50) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  ingreso_mensual NUMERIC(14,2) NOT NULL,
  domicilio TEXT NOT NULL,
  empleador VARCHAR(150),
  antiguedad_laboral VARCHAR(50),
  monto_solicitado NUMERIC(14,2) NOT NULL,
  plazo_pago VARCHAR(50) NOT NULL,
  propiedad_financiar TEXT NOT NULL,
  valor_inmueble NUMERIC(14,2) NOT NULL,
  aval_coacreditado TEXT,
  referencias_personales TEXT,
  cuenta_bancaria VARCHAR(100),
  firma_digital TEXT,
  ine_solicitante TEXT,
  comprobante_ingresos TEXT,
  avaluo_inmueble TEXT,
  predial_escritura TEXT,
  comprobante_domicilio TEXT,
  fotografia_propiedad TEXT
);
