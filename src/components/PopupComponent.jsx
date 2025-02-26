import Popup from 'reactjs-popup';
import { MicrositeOpenPlayground } from '@/components/demo/microsite/MicrositeOpenPlayground';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import 'reactjs-popup/dist/index.css';  // Import the default styles

export function PopupComponent() {
  const markdown = `# Diseño del micrositio \n## Instrucciones \n1. Ten presente que los campos **"Referencia"**, **"Descripción del pago"**, **"Moneda"** y **"Monto"** son obligatorios y no pueden eliminarse. \n2. Usa el botón ✏️ *(editar)* para renombrar el campo y el botón 🗑️ *(eliminar)* si deseas quitarlo. \n3. Cuando agregues un nuevo campo con el botón *(Añadir nuevo campo)*, recuerda renombrarlo. \n4. En el campo observaciones, puedes especificar: \n- Cuántas columnas visualizar en los campos. \n- Si deseas aplicar alguna lógica específica al micrositio. \n- Configurar una lista desplegable con sus respectivos ítems. \n5. Una vez termines el diseño del micrositio, presiona el botón *(**Descargar PDF**)* para guardarla y compartirla posteriormente.`;
  return (
    <Popup trigger={<button className="button">Personalizar mi micrositio ➜</button>} modal>
      {(close) => (
        <div className="modal popup-scrollable">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className='mdxUl'>
            <MarkdownRenderer markdown = {markdown} />
          </div>
          <MicrositeOpenPlayground />
        </div>
      )}
    </Popup>
  );
};