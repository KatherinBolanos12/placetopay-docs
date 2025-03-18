import * as React from "react";
import { useRef, useState } from 'react';
import { ColorPicker } from '@/components/HexColorPicker';
import { List, arrayMove } from "react-movable";
import { Pencil, Trash, Plus, Palette, ImagePlus } from "lucide-react";
import { ImageToBase64 } from '@/components/PopupLogoMicrositeOpen';
import { ContrastText } from '@/components/AutomaticTextContrast';
import Image from 'next/image';
import footerSvg from '@/images/logos/footer.svg';
import generatePDF, { Margin } from 'react-to-pdf';

export function MicrositeOpenPlayground() {
  const [fields, setFields] = React.useState([
    { id: "reference", label: "Referencia", subLabel: "(Referencia)", type: "text", required: true },
    { id: "payment_description", label: "Descripción del pago", subLabel: "(Descripción del pago)", type: "text", required: true },
    { id: "currency", label: "Moneda", subLabel: "(Moneda)", type: "select", options: ["Selecciona una opción", "Peso colombiano", "Dólar estadounidense"], required: true },
    { id: "amount", label: "Monto", subLabel: "(Monto)", type: "text", required: true },
    { id: "buyer_id_type", label: "Tipo de documento", type: "select", options: ["Selecciona una opción", "Cédula de ciudadanía", "Cédula de extranjería", "NIT"] },
    { id: "buyer_id", label: "Documento del comprador", type: "text" },
    { id: "buyer_name", label: "Nombre del comprador", type: "text" },
    { id: "buyer_surname", label: "Apellido del comprador", type: "text" },
    { id: "buyer_email", label: "Correo electrónico", type: "email" },
  ]);

  const [fieldCounter, setFieldCounter] = React.useState(9); // Starting from 9 since initial items go up to 8
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

  const addNewRow = (numFields) => {
    const newFields = Array(numFields).fill(null).map((_, index) => ({
      id: `field_${fieldCounter + index}`,
      label: `Campo ${fieldCounter + index}`,
      type: "text",
    }));
    setFieldCounter(fieldCounter + numFields);
    setFields([...fields, { id: `row_${fieldCounter}`, columns: newFields }]);
  };

  const handleFieldSelection = (e) => {
    const numFields = parseInt(e.target.value);
    if (!isNaN(numFields)) addNewRow(numFields);
  };

  const targetRef = useRef();
  const [isVisibleBtn, setIsVisibleBtn] = useState(false);
  const [isVisibleLogo, setIsVisibleLogo] = useState(false);
  const [isVisibleSidePanel, setIsVisibleSidePanel] = useState(false);
  const [isVisiblePDF, setIsVisiblePDF] = useState(true);
  const [colorBtn, setColorBtn] = useState("#64748B");
  const [colorSidePanel, setColorSidePanel] = useState("#F1F5F9");

  const handleClickSidePanel = () => {
    setIsVisibleSidePanel(!isVisibleSidePanel);
  };

  const handleClickBtn = () => {
    setIsVisibleBtn(!isVisibleBtn);
  };

  const handleClickLogo = () => {
    setIsVisibleLogo(!isVisibleLogo);
  };

  const getContentSize = () => {
    const content = targetRef.current;
    if (content) {
      const rect = content.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height
      };
    }
    return { width: 210, height: 297 }; // tamaño A4 por defecto en mm
  };

  const handleClickPDF = () => {
    const contentSize = getContentSize();
    const pdfOptions = {
      method: 'open',
      page: {
        format: [contentSize.height / 4, contentSize.width / 4],
        orientation: 'landscape'
      },
      filename: 'MicrositeOpen.pdf'
    }
    setIsVisiblePDF(false);
    setIsVisibleBtn(false);
    setIsVisibleLogo(false);
    setIsVisibleSidePanel(false);
    setTimeout(() => {
      generatePDF(targetRef, pdfOptions);
      setIsVisiblePDF(true);
    }, 1000);
  };


  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <button className="mt-4 p-2 bg-gray-500 text-white rounded-lg flex items-center justify-center" onClick={() => handleClickPDF()}>Descargar PDF</button>
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
                    <ImageToBase64 isVisible={isVisibleLogo}></ImageToBase64>
                    {isVisiblePDF && (
                      <button type="button" className="pl-3" onClick={() => handleClickLogo()}><ImagePlus size={16} /></button>
                    )}
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
                          renderList={({ children, props, isDragged }) => (
                            <div {...props} className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ cursor: isDragged ? 'grabbing' : undefined }}>
                              {children}
                            </div>
                          )}
                          renderItem={({ value, props, isDragged, isSelected }) => {
                            if (value.columns) {
                              return (
                                <div
                                  {...props}
                                  key={props.key}
                                  style={{
                                    ...props.style,
                                    padding: '0.3rem',
                                    cursor: isDragged ? 'grabbing' : 'grab',
                                    borderRadius: '0.5rem',
                                    backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF',
                                    zIndex: isDragged ? 1000 : 'auto',
                                    display: 'grid',
                                    gridTemplateColumns: `repeat(${value.columns.length}, 1fr)`,
                                    gap: '8px',
                                    width: '100%'
                                  }}
                                  className="col-span-2"
                                >
                                  {value.columns.map((field) => (
                                    <div key={field.id} className="flex flex-col">
                                      <div className="flex items-center gap-2">
                                        <label className="text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="text"
                                          className="w-full border border-gray-400 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary-300 rounded-lg"
                                          id={field.id}
                                        />
                                        {isVisiblePDF && (
                                          <button type="button" onClick={() => handleEdit(field.id)} className="text-blue-500">
                                            <Pencil size={16} />
                                          </button>
                                        )}
                                        {isVisiblePDF && !protectedFields.includes(field.id) && (
                                          <button type="button" onClick={() => handleDelete(field.id)} className="text-red-500">
                                            <Trash size={16} />
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              );
                            } else {
                              const isFullWidth = value.id === "reference" || value.id === "payment_description" || value.id === "buyer_email";
                              return (
                                <div
                                  {...props}
                                  key={props.key}
                                  style={{
                                    ...props.style,
                                    padding: '0.3rem',
                                    cursor: isDragged ? 'grabbing' : 'grab',
                                    borderRadius: '0.5rem',
                                    backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF',
                                    zIndex: isDragged ? 1000 : 'auto'
                                  }}
                                  className={`flex flex-col ${isFullWidth ? 'col-span-2' : 'col-span-1'}`}
                                >
                                  <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-gray-700 mb-2">{value.label}</label>
                                    <span className="text-sm text-gray-500 mb-2">{value.subLabel}</span>
                                    {protectedFields.includes(value.id) && (
                                      <p className="text-red-500">*</p>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      className="w-full border border-gray-400 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary-300 rounded-lg"
                                      id={value.id}
                                    />
                                    {isVisiblePDF && (
                                      <button type="button" onClick={() => handleEdit(value.id)} className="text-blue-500">
                                        <Pencil size={16} />
                                      </button>
                                    )}
                                    {isVisiblePDF && !protectedFields.includes(value.id) && (
                                      <button type="button" onClick={() => handleDelete(value.id)} className="text-red-500">
                                        <Trash size={16} />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          }}
                        />

                        <div className="mt-6">
                          <p className="text-gray-500 text-sm text-justify">
                            Al continuar, acepto las <span>políticas</span> aplicables para el tratamiento de mis datos personales según la jurisdicción local del responsable y de
                            <a href="https://www.placetopay.com/web/politicas-de-privacidad/" target="_blank" rel="noopener noreferrer" className="font-bold" tabIndex="-1"> Evertec PlacetoPay</a> en su calidad de encargado.
                          </p>
                        </div>
                        <p className="flex flex-col items-center mt-6">
                          {isVisibleBtn && (
                            <ColorPicker color={colorBtn} setColor={setColorBtn} />
                          )}
                          <div class="flex items-center space-x-2">
                            <ContrastText bgColor={colorBtn}>
                              <button type="button" className="mt-4 mb-4 pl-20 pr-20 p-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: colorBtn }}>Pagar</button>
                            </ContrastText>
                            {isVisiblePDF && (
                              <button type="button" onClick={() => handleClickBtn()}><Palette size={16} /></button>
                            )}
                          </div>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: colorSidePanel }} className="shrink-0 flex flex-col justify-between relative p-8 w-1/3 z-0">
            <div className="text-black">
              <ContrastText bgColor={colorSidePanel}>
                <h2 className="font-bold text-2xl mb-3 md:mb-5">Pagos electrónicos</h2>
                <p className="text-justify">
                  Pague de forma segura desde su hogar, oficina o cualquier lugar a través de nuestro sistema de pago. Utilice convenientemente nuestro servicio las 24 horas del día, los 7 días de la semana.
                </p>
              </ContrastText>
            </div>
            {isVisibleSidePanel && (
              <ColorPicker color={colorSidePanel} setColor={setColorSidePanel} />
            )}
            <div className="flex flex-col">
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex flex-row items-center">
                  {isVisiblePDF && (
                    <ContrastText bgColor={colorSidePanel}>
                      <button type="button" onClick={() => handleClickSidePanel()}><Palette size={16} /></button>
                    </ContrastText>
                  )}
                  <ContrastText bgColor={colorSidePanel}>
                    <div className="text-xs font-semibold p-2">Hecho por</div>
                  </ContrastText>
                  <div className="p-4">
                    <Image src={footerSvg} alt="Logo" className="w-24" />
                  </div>
                </div>
                <div className="relative">
                  <div className="flex flex-row items-center cursor-pointer">
                    <div className="text-gray-500 h-5 w-5">
                      <ContrastText bgColor={colorSidePanel}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"></path>
                        </svg>
                      </ContrastText>
                    </div>
                    <ContrastText bgColor={colorSidePanel}>
                      <div className="text-xs font-semibold p-2">Español</div>
                    </ContrastText>
                    <div className="text-gray-500 h-5 w-5">
                      <ContrastText bgColor={colorSidePanel}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
                        </svg>
                      </ContrastText>
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