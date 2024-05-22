const express = require('express');
const router = express.Router();
const Excel = require('exceljs');
const { Ticket } = require('../../bd');

router.get('/download-tickets-excel', async (req, res) => {
    try {
        // Obtener todos los tickets de la base de datos
        const tickets = await Ticket.findAll();

        // Crear un nuevo workbook de Excel
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Tickets');

        // Definir encabezados de columna
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Estado', key: 'state', width: 20 },
            // Agregar más columnas según las propiedades de Ticket que desees incluir en el Excel
        ];

        // Agregar filas para cada ticket
        tickets.forEach(ticket => {
            worksheet.addRow({
                id: ticket.id,
                state: ticket.state,
                // Agregar más propiedades según las que quieras incluir en el Excel
            });
        });

        // Escribir el workbook en un stream
        const stream = await workbook.xlsx.writeBuffer();

        // Configurar encabezados para la respuesta
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=tickets.xlsx');

        // Enviar el archivo Excel como respuesta
        res.send(stream);
    } catch (error) {
        console.error('Error al generar el archivo Excel:', error);
        res.status(500).send('Error al generar el archivo Excel');
    }
});

module.exports = router;