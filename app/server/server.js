import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pkg from 'pg';

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json({ limit: '15mb' }));

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || '',
  database: process.env.PGDATABASE || 'postgres',
});

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// CRUD contratos
// Tabla esperada:
// id_contrato SERIAL PRIMARY KEY,
// usuario VARCHAR(100) NOT NULL,
// fecha_contratacion DATE NOT NULL,
// imagen1 TEXT,
// imagen2 TEXT,
// imagen3 TEXT

app.get('/api/dsm43/contratos', async (_req, res) => {
  try{
    const { rows } = await pool.query('SELECT * FROM contratos ORDER BY id_contrato DESC');
    res.json(rows);
  }catch(e){
    res.status(500).json({ message: 'GET contratos falló', error: e.message });
  }
});

app.post('/api/dsm43/contratos', async (req, res) => {
  const { usuario, fecha_contratacion, imagen1, imagen2, imagen3 } = req.body || {};
  try{
    const query = `INSERT INTO contratos (usuario, fecha_contratacion, imagen1, imagen2, imagen3)
                   VALUES ($1, $2, $3, $4, $5)
                   RETURNING *`;
    const values = [usuario, fecha_contratacion, imagen1 || null, imagen2 || null, imagen3 || null];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  }catch(e){
    res.status(500).json({ message: 'POST contrato falló', error: e.message });
  }
});

app.patch('/api/dsm43/contratos/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { usuario, fecha_contratacion, imagen1, imagen2, imagen3 } = req.body || {};
  try{
    const query = `UPDATE contratos
                   SET usuario = $1,
                       fecha_contratacion = $2,
                       imagen1 = $3,
                       imagen2 = $4,
                       imagen3 = $5
                   WHERE id_contrato = $6
                   RETURNING *`;
    const values = [usuario, fecha_contratacion, imagen1 || null, imagen2 || null, imagen3 || null, id];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) return res.status(404).json({ message: 'Contrato no encontrado' });
    res.json(rows[0]);
  }catch(e){
    res.status(500).json({ message: 'PATCH contrato falló', error: e.message });
  }
});

app.delete('/api/dsm43/contratos/:id', async (req, res) => {
  const id = Number(req.params.id);
  try{
    const { rowCount } = await pool.query('DELETE FROM contratos WHERE id_contrato = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ message: 'Contrato no encontrado' });
    res.json({ ok: true });
  }catch(e){
    res.status(500).json({ message: 'DELETE contrato falló', error: e.message });
  }
});
app.get('/api/dsm43/hipotecas', async (_req, res) => {
  try{
    const { rows } = await pool.query('SELECT * FROM creditos_hipotecarios ORDER BY id_hipoteca DESC');
    res.json(rows);
  }catch(e){
    res.status(500).json({ message: 'GET hipotecas falló', error: e.message });
  }
});

app.post('/api/dsm43/hipotecas', async (req, res) => {
  const {
    nombre_solicitante,
    estado_civil,
    fecha_nacimiento,
    ingreso_mensual,
    domicilio,
    empleador,
    antiguedad_laboral,
    monto_solicitado,
    plazo_pago,
    propiedad_financiar,
    valor_inmueble,
    aval_coacreditado,
    referencias_personales,
    cuenta_bancaria,
    firma_digital,
    ine_solicitante,
    comprobante_ingresos,
    avaluo_inmueble,
    predial_escritura,
    comprobante_domicilio,
    fotografia_propiedad,
  } = req.body || {};
  try{
    const query = `INSERT INTO creditos_hipotecarios (
      nombre_solicitante, estado_civil, fecha_nacimiento, ingreso_mensual, domicilio,
      empleador, antiguedad_laboral, monto_solicitado, plazo_pago, propiedad_financiar,
      valor_inmueble, aval_coacreditado, referencias_personales, cuenta_bancaria, firma_digital,
      ine_solicitante, comprobante_ingresos, avaluo_inmueble, predial_escritura, comprobante_domicilio, fotografia_propiedad
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21
    ) RETURNING *`;
    const values = [
      nombre_solicitante, estado_civil, fecha_nacimiento, ingreso_mensual, domicilio,
      empleador || null, antiguedad_laboral || null, monto_solicitado, plazo_pago, propiedad_financiar,
      valor_inmueble, aval_coacreditado || null, referencias_personales || null, cuenta_bancaria || null, firma_digital || null,
      ine_solicitante || null, comprobante_ingresos || null, avaluo_inmueble || null, predial_escritura || null, comprobante_domicilio || null, fotografia_propiedad || null
    ];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  }catch(e){
    res.status(500).json({ message: 'POST hipoteca falló', error: e.message });
  }
});

app.patch('/api/dsm43/hipotecas/:id', async (req, res) => {
  const id = Number(req.params.id);
  const {
    nombre_solicitante,
    estado_civil,
    fecha_nacimiento,
    ingreso_mensual,
    domicilio,
    empleador,
    antiguedad_laboral,
    monto_solicitado,
    plazo_pago,
    propiedad_financiar,
    valor_inmueble,
    aval_coacreditado,
    referencias_personales,
    cuenta_bancaria,
    firma_digital,
    ine_solicitante,
    comprobante_ingresos,
    avaluo_inmueble,
    predial_escritura,
    comprobante_domicilio,
    fotografia_propiedad,
  } = req.body || {};
  try{
    const query = `UPDATE creditos_hipotecarios SET
      nombre_solicitante=$1, estado_civil=$2, fecha_nacimiento=$3, ingreso_mensual=$4, domicilio=$5,
      empleador=$6, antiguedad_laboral=$7, monto_solicitado=$8, plazo_pago=$9, propiedad_financiar=$10,
      valor_inmueble=$11, aval_coacreditado=$12, referencias_personales=$13, cuenta_bancaria=$14, firma_digital=$15,
      ine_solicitante=$16, comprobante_ingresos=$17, avaluo_inmueble=$18, predial_escritura=$19, comprobante_domicilio=$20, fotografia_propiedad=$21
      WHERE id_hipoteca=$22 RETURNING *`;
    const values = [
      nombre_solicitante, estado_civil, fecha_nacimiento, ingreso_mensual, domicilio,
      empleador || null, antiguedad_laboral || null, monto_solicitado, plazo_pago, propiedad_financiar,
      valor_inmueble, aval_coacreditado || null, referencias_personales || null, cuenta_bancaria || null, firma_digital || null,
      ine_solicitante || null, comprobante_ingresos || null, avaluo_inmueble || null, predial_escritura || null, comprobante_domicilio || null, fotografia_propiedad || null,
      id
    ];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) return res.status(404).json({ message: 'Hipoteca no encontrada' });
    res.json(rows[0]);
  }catch(e){
    res.status(500).json({ message: 'PATCH hipoteca falló', error: e.message });
  }
});

app.delete('/api/dsm43/hipotecas/:id', async (req, res) => {
  const id = Number(req.params.id);
  try{
    const { rowCount } = await pool.query('DELETE FROM creditos_hipotecarios WHERE id_hipoteca = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ message: 'Hipoteca no encontrada' });
    res.json({ ok: true });
  }catch(e){
    res.status(500).json({ message: 'DELETE hipoteca falló', error: e.message });
  }
});

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API escuchando en http://0.0.0.0:${PORT}`);
});
