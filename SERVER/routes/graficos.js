const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/grafico/:indice', async (req, res) => {
    const { indice } = req.params;
    var sql = `SELECT PL.id, PL.cripto, PL.fecha, PL.id_precio, PL.forecast, PL.pesimista, PL.optimista, PL.id_grupo, PA.precio AS precio FROM ${process.env.TABLE_CRIPTO_PROY_LP} AS PL LEFT JOIN ${process.env.TABLE_CRIPTO_PRECIO_ACTUAL} AS PA ON PL.id_precio = PA.id WHERE cripto = ? ORDER BY fecha ASC`;
    const datos = await pool.query(sql, [indice]);
    const datosExtraidos = JSON.stringify(datos);
    res.send(datosExtraidos);
});

module.exports = router; 