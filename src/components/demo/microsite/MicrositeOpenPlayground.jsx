import React, { useEffect, useRef } from 'react';

export function MicrositeOpenPlayground() {
  const pinpadContainerRef = useRef();

  useEffect(() => {
    const src = 'https://unpkg.com/@placetopay/pinpad-sdk@latest/dist/pinpad-sdk.umd.js';
    const container = pinpadContainerRef.current;

    if (document.querySelector(`script[src="${src}"]`)) {
      return () => {
        if (container) container.innerHTML = '';
      };
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div className="mt-8 rounded-xl border border-gray-300 dark:border-gray-700">
      <div className="flex min-h-[24rem] w-full divide-x divide-gray-300 dark:divide-gray-700">


        <div className="flex-1 p-4 space-x-4">
          {/* Lado derecho */}
          <div className="flex min-h-[24rem] w-full divide-x divide-gray-300 dark:divide-gray-700">
            <div className="w-2/3 p-4">
              <div className="mx-auto w-full grow flex">
                <div className="flex-1 h-screen xl:flex overflow-y-auto">
                  <div className="mx-auto w-full">
                    <div className="card-main h-screen flex flex-col justify-between" name="EGM Demostración - Comercio de Pruebas Test Lina" header="https://placetopay-static-uat-bucket.s3.us-east-2.amazonaws.com/co/test/microsites/images/8V4kVIZ5f9tdiIcNOXmKwxXwkZBTohX6ga7SiGu6.png">
                      <div className="p-4 flex-grow">
                        <div className="w-full flex justify-center mt-4 mb-8">
                          <img src="https://placetopay-static-uat-bucket.s3.us-east-2.amazonaws.com/co/test/microsites/images/8V4kVIZ5f9tdiIcNOXmKwxXwkZBTohX6ga7SiGu6.png" className="h-24 w-auto" alt="EGM Demostración - Comercio de Pruebas Test Lina" />
                        </div>
                        <div className="my-4 md:my-6 text-center">
                          <p className="font-bold">Comience el proceso de pago, ingresando la siguiente información</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="shrink-0 flex flex-col justify-between relative p-8 w-1/3 z-0">
              <div className="flex flex-col justify-start flex-grow">
                <div className="text-black">
                  <div className="my-5">
                    <h2 className="font-bold text-2xl mb-3 md:mb-5">Pagos electrónicos</h2>
                    <p className="text-justify">Pague de forma segura desde su hogar, oficina o cualquier lugar a través de nuestro sistema de pago. Utilice convenientemente nuestro servicio las 24 horas del día, los 7 días de la semana</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-wrap justify-between mx-8 items-center">
                  <div className="flex flex-row items-center">
                    <div className="text-xs font-semibold text-gray-500 p-2">Hecho por</div>
                    <div className="p-4">
                      <div className="h-24 w-24">
                        <img src="https://static.placetopay.com/placetopay-logo.svg" alt="Logo" className="h-24 w-24" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div data-headlessui-state="" className="relative">
                      <div>
                        <div className="flex flex-row items-center cursor-pointer" disabled="false" id="headlessui-menu-button-v-0" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">
                          <div className="text-gray-500 h-5 w-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"></path>
                            </svg>
                          </div>
                          <div className="text-xs font-semibold text-gray-500 p-2">Español</div>
                          <div className="text-gray-500 h-5 w-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
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
          {/* Div para el pinpad */}
          <div id="pinpad-container" ref={pinpadContainerRef}></div>
        </div>
      </div>
    </div>
  );
}

export default MicrositeOpenPlayground;
