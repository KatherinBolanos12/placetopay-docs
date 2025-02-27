import * as React from "react";
import { useRef, useState } from 'react';
import { ExportToPDF } from '@/components/ExportToPDF';
import { ColorPicker } from '@/components/HexColorPicker';
import { List, arrayMove } from "react-movable";
import { Pencil, Trash, Plus, Palette } from "lucide-react";
import Image from 'next/image'
import logoPng from '@/images/logos/logo.png'
import footerSvg from '@/images/logos/footer.svg'

export function MicrositeOpenPlayground() {
  const [color, setColor] = useState("#64748B");
  const [fields, setFields] = React.useState([
    {
      id: "reference",
      label: "Referencia",
      subLabel: "(Referencia)",
      type: "text",
      required: true,
    },
    {
      id: "payment_description",
      label: "Descripción del pago",
      subLabel: "(Descripción del pago)",
      type: "text",
      required: true,
    },
    {
      id: "currency",
      label: "Moneda",
      subLabel: "(Moneda)",
      type: "select",
      options: ["Selecciona una opción", "Peso colombiano", "Dólar estadounidense"],
      required: true,
    },
    {
      id: "amount",
      label: "Monto",
      subLabel: "(Monto)",
      type: "text",
      required: true,
    },
    {
      id: "buyer_id_type",
      label: "Tipo de documento del comprador",
      type: "select",
      options: ["Selecciona una opción", "Cédula de ciudadanía", "Cédula de extranjería", "NIT"],
    },
    {
      id: "buyer_id",
      label: "Documento del comprador",
      type: "text",
    },
    {
      id: "buyer_name",
      label: "Nombre del comprador",
      type: "text",
    },
    {
      id: "buyer_surname",
      label: "Apellido del comprador",
      type: "text",
    },
    {
      id: "buyer_email",
      label: "Correo electrónico",
      type: "email",
    },
  ]);

  const [fieldCounter, setFieldCounter] = React.useState(6);
  const targetRef = useRef();
  const protectedFields = ["reference", "payment_description", "currency", "amount"];

  const handleEdit = (id) => {
    const newLabel = prompt("Ingrese el nuevo nombre del campo:");
    if (newLabel) {
      setFields(fields.map(field => field.id === id ? { ...field, label: newLabel } : field));
    }
  };

  const handleDelete = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleFieldSelection = (e) => {
    const numFields = parseInt(e.target.value);
    if (!isNaN(numFields)) addNewRow(numFields);
  };

  const addNewRow = (numFields) => {
    setFieldCounter(prevCounter => {
      const newFields = Array.from({ length: numFields }, () => {
        const newCounter = prevCounter + 1;
        return {
          id: `field${newCounter}`,
          label: `Nuevo campo ${newCounter}`,
          type: "text",
          required: false,
        };
      });

      setFields(prevFields => [...prevFields, ...newFields]);

      return prevCounter + numFields;
    });
  };

  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>


      <div className="flex flex-wrap items-center gap-4">
        <ExportToPDF targetRef={targetRef} />
        <div className="flex flex-row gap-4 items-start cursor-pointer mt-4">
          <select
            id="fieldSelector"
            className="p-2 bg-gray-500 text-white rounded-lg flex items-center justify-center cursor-pointer focus:outline-none hover:bg-gray-600"
            onChange={handleFieldSelection}
          >
            <option value="">Agregar Campo</option>
            <option value="1">1 Fila de 1 Campo</option>
            <option value="2">1 Fila de 2 Campos</option>
            <option value="3">1 Fila de 3 Campos</option>
          </select>
        </div>
      </div>


      <div ref={targetRef} className="mt-8 rounded-xl border border-gray-300 dark:border-gray-700 w-full">
        <div className="mx-auto w-full grow flex">
          <div className="flex-1 h-fit xl:flex">
            <div className="mx-auto w-full">
              <div className="card-main h-fit flex flex-col justify-between" name="EGM Demostración - Comercio de Pruebas Test Lina" header="https://placetopay-static-uat-bucket.s3.us-east-2.amazonaws.com/co/test/microsites/images/8V4kVIZ5f9tdiIcNOXmKwxXwkZBTohX6ga7SiGu6.png">
                <div className="p-4 flex-grow">
                  <div className="w-full flex justify-center mt-4 mb-8">
                    <Image src={logoPng} alt="Logo" />
                  </div>
                  <div className="my-4 md:my-6 text-center">
                    <p className="font-bold">Comience el proceso de pago, ingresando la siguiente información</p>
                  </div>
                  <div className="md:mt-6 mb-24 md:mb-12 md:mx-auto flex flex-row w-full lg:w-4/5">
                    <form noValidate="" className="p-0 lg:p-0 md:p-2 flex flex-col">
                      <div className="form-layout w-full">

                        <List
                          values={fields}
                          onChange={({ oldIndex, newIndex }) =>
                            setFields(arrayMove(fields, oldIndex, newIndex))
                          }
                          renderList={({ children, props }) => (
                            <div {...props} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {children}
                            </div>
                          )}
                          renderItem={({ value, props }) => (
                            <div {...props} className="flex flex-col">
                              <label className="text-sm font-medium text-gray-700 mb-1">{value.label}</label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  className="w-full border border-gray-400 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary-300 rounded-lg"
                                  placeholder={value.subLabel}
                                  id={value.id}
                                />
                                <button type="button" onClick={() => handleEdit(value.id)} className="text-blue-500">
                                  <Pencil size={16} />
                                </button>
                                {!protectedFields.includes(value.id) && (
                                  <button type="button" onClick={() => handleDelete(value.id)} className="text-red-500">
                                    <Trash size={16} />
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        />
                        <div className="mt-6">
                          <p className="text-gray-500 text-sm text-justify">
                            Al continuar, acepto las <span>políticas</span> aplicables para el tratamiento de mis datos personales según la jurisdicción local del responsable y de
                            <a href="https://www.placetopay.com/web/politicas-de-privacidad/" target="_blank" rel="noopener noreferrer" className="font-bold" tabIndex="-1"> Evertec PlacetoPay</a> en su calidad de encargado.
                          </p>
                        </div>
                        <p className="flex flex-col items-center mt-6">
                          {isVisible && (
                            <ColorPicker color={color} setColor={setColor} />
                          )}
                          <div class="flex items-center space-x-2">
                            <button type="button" className="mt-4 mb-4 pl-20 pr-20 p-2 bg-gray-500 text-white rounded-lg flex items-center justify-center" style={{ backgroundColor: color }}>Pagar</button>
                            <button type="button" onClick={() => handleClick()}><Palette size={16} /></button>
                          </div>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col justify-between relative p-8 w-1/3 z-0 side-panel">
            <div className="text-black">
              <h2 className="font-bold text-2xl mb-3 md:mb-5">Pagos electrónicos</h2>
              <p className="text-justify">
                Pague de forma segura desde su hogar, oficina o cualquier lugar a través de nuestro sistema de pago. Utilice convenientemente nuestro servicio las 24 horas del día, los 7 días de la semana.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex flex-row items-center">
                  <div className="text-xs font-semibold text-gray-500 p-2">Hecho por</div>
                  <div className="p-4">
                    <Image src={footerSvg} alt="Logo" className="w-24" />
                  </div>
                </div>
                <div className="relative">
                  <div className="flex flex-row items-center cursor-pointer">
                    <div className="text-gray-500 h-5 w-5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"></path>
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-500 p-2">Español

                    </div>
                    <div className="text-gray-500 h-5 w-5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
export default MicrositeOpenPlayground;