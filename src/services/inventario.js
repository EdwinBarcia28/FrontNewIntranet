import axiosInstance from "@/lib/axios";

export const OficinaInventarioRequest = async (token) => {
  try {
    const response = await axiosInstance.get(
      "/Search/info-oficina",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};

export const searchOficinaInventarioRequest = async (filtro, token) => {
  try {
    const response = await axiosInstance.get(
      "/Search/info-oficina-filtro",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          filtro: filtro,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};

export const secuencialDesdeRequest = async (token) => {
  try {
    const response = await axiosInstance.get(
      "/Search/info-secuencial-desde",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};

export const OficinaPrincipalRequest = async (token) => {
  try {
    const response = await axiosInstance.get(
      "/Search/info-oficina-principal",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};

export const secuencialHastaRequest = async (token) => {
  try {
    const response = await axiosInstance.get(
      "/Search/info-secuencial-hasta",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};

export const registerDespachoRequest = async (despacho, token) => {
  try {
    const response = await axiosInstance.post(
      "/Inventario/insert-despacho",
      despacho,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};

export const registerInsertSolicitudDespachoRequest = async (despacho, token) => {
  try {
    const response = await axiosInstance.post(
      "/Inventario/insert-despacho-solicitud",
      despacho,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};

export const registerSolicitudDespachoRequest = async (despacho, token) => {
  try {
    const response = await axiosInstance.post(
      "/Inventario/register-solicitud-despacho",
      despacho,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};

export const LimpiarSecuenciales = async (token) => {
  try {
    const response = await axiosInstance.get(
      "/Search/truncate-secuenciales",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};

export const searchDespachoRequest = async (despacho, token) => {
  try {
    const response = await axiosInstance.post(
      "/Inventario/info-despacho",
      despacho,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};

export const anularDespachoRequest = async (despacho, token) => {
  try {
    const response = await axiosInstance.post(
      "/Inventario/anular-despacho",
      despacho,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};


export const aprobarDespachoRequest = async (despacho, token) => {
  try {
    const response = await axiosInstance.post(
      "/Inventario/aprobar-despacho",
      despacho,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};

export const imprimirEtiqueta = (desde, hasta, destino) => {
  const contenido = `
    <html>
    <head>
      <style>
        @media print {
          @page {
            size: landscape;
            margin: 0;
          }
        }
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .etiqueta {
          width: 90%;
          border: 3px dashed black;
          padding: 30px;
          text-align: center;
          transform: rotate(0deg);
        }
        .etiqueta h1 {
          font-size: 48px;
          margin-bottom: 10px;
        }
        .etiqueta p {
          font-size: 36px;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="etiqueta">
        <h1>📦 Traslado de Inventario</h1>
        <p><strong>Desde:</strong> ${desde}</p>
        <p><strong>Hasta:</strong> ${hasta}</p>
        <p><strong>Destino:</strong> ${destino}</p>
      </div>
      <script>
        window.onload = function() {
          window.print();
          window.onafterprint = function() {
            window.close();
          }
        }
      </script>
    </body>
    </html>
  `;

  const ventana = window.open('', '', 'width=1000,height=700');
  ventana.document.write(contenido);
  ventana.document.close();
}

export const solicitudDespachoRequest = async (token, usuario) => {

  try {
    const response = await axiosInstance.get(
      "/Inventario/info-solicitud-despacho-user",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { usuario },
      }
    ); 

    return response.data;
  } catch (error) {
    console.log(">>> LLEGO A solicitudDespachoRequest", { token, usuario });
    throw error;
  }
};

export const solicitudDespachoInventarioRequest = async (token, usuario) => {

  try {
    const response = await axiosInstance.get(
      "/Inventario/info-solicitud-despacho",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { usuario },
      }
    ); 

    return response.data;
  } catch (error) {
    console.log(">>> LLEGO A solicitudDespachoRequest", { token, usuario });
    throw error;
  }
};


export const searchSolicitudDespachoRequest = async (data, token) => {
  try {
    const response = await axiosInstance.post(
      "/Inventario/search-solicitud-despacho",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error en searchSolicitudDespachoRequest:", error);
    return null;
  }
};

export const solicitudDespachoGeneralRequest = async (token) => {

  try {
    const response = await axiosInstance.get(
      "/Inventario/info-solicitud-despacho-general",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ); 

    return response.data;
  } catch (error) {
    console.log(">>> LLEGO A solicitudDespachoRequest", { token});
    throw error;
  }
};
export const searchSolicitudDespachoGeneralRequest = async (data, token) => {
  try {
    const response = await axiosInstance.post(
      "/Inventario/search-solicitud-despacho-general",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error en searchSolicitudDespachoRequest:", error);
    return null;
  }
};


export const anularSolicitudDespachoRequest = async (despacho, token) => {
  try {
    const response = await axiosInstance.post(
      "/Inventario/anular-Solicitud-despacho",
      despacho,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};

export const aprobarSolicitudDespachoRequest = async (despacho, token) => {
  try {
    const response = await axiosInstance.post(
      "/Inventario/aprobar-Solicitud-despacho",
      despacho,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};


export const registerIngresoRequest = async (ingreso, token) => {
  try {
    const response = await axiosInstance.post(
      "/Inventario/insert-ingreso-inicial",
      ingreso,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};
