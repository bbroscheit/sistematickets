import React from 'react';

const DownloadExcelButton = () => {
    const handleDownload = async () => {
        try {
            const response = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/download-tickets-excel`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'tickets.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error al descargar el archivo Excel:', error);
        }
    };

    return (
        <button onClick={handleDownload}>Descargar Tickets en Excel</button>
    );
};

export default DownloadExcelButton;