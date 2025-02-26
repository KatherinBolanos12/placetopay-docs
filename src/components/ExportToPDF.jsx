import generatePDF from 'react-to-pdf';

export function ExportToPDF({ targetRef }) {
    return (
        <div>
            <button className="mt-4 p-2 bg-gray-500 text-white rounded-lg flex items-center justify-center" onClick={() => generatePDF(targetRef, {filename: 'MicrositeOpen.pdf'})}>Descargar PDF</button>
        </div>
    )
}