import axiosInstance from "@/lib/axios";

export const yearRequest = async (token) => {
  try {
    const response = await axiosInstance.get("/Comprobante/year-vigencia", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(`Error al obtener los year: ${error}`);
    throw error;
  }
}

export const searchComprobanteRequest = async (comprobante, token) => {
  try {
    const response = await axiosInstance.post(
      "/Comprobante/info-comprobante-banca",
      comprobante,
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

export const searchComprobanteRequestSupervisores = async (comprobante, token) => {
  try {
    const response = await axiosInstance.post(
      "/Comprobante/info-comprobante-banca-supervisores",
      comprobante,
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


export const searchComprobanteRequestQr = async (comprobante, token) => {
  try {
    const response = await axiosInstance.post(
      "/Comprobante/info-comprobante-banca-qr",
      comprobante,
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

export const searchComprobanteGrmRequest = async (comprobante, token) => {
  try {
    const response = await axiosInstance.post(
      "/Comprobante/info-comprobante-bandeja",
      comprobante,
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

export const registerComprobanteRequest = async (comprobante, token) => {
  try {
    const response = await axiosInstance.post(
      "/Comprobante/register-comprobante",
      comprobante,
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

export const searchCiudadanoRequest = async (cedula, token) => {
  try {
    const response = await axiosInstance.get(
      "/Search/info-ciudadano-cedula",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          cedula: cedula, 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};

export const searchServiceRequest = async (servicio, token) => {
  try {
    const response = await axiosInstance.post(
      "/Search/info-servicio",
      servicio,
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

export const serviceRequest = async (token) => {
  try {
    const response = await axiosInstance.get("/Search/info-servicio-total", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(`Error al obtener los year: ${error}`);
    throw error;
  }
}

export const registerComprobanteBolivariano = async (comprobante, token) => {
  try {
    const response = await axiosInstance.post(
      "/Comprobante/register-comprobante-bolivariano",
      comprobante,
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

export const searchComprobanteBanco = async (comprobante, token) => {
  try {
    const response = await axiosInstance.post(
      "/Comprobante/info-comprobante-bandeja-bolivariano",
      comprobante,
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

export const reverseComprobanteBanco = async (comprobante, token) => {
  try {
    const response = await axiosInstance.post(
      "/Comprobante/reverse-comprobante-bolivariano",
      comprobante,
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

export const verificarComprobanteGrm = async (comprobante, token) => {
  try {
    const response = await axiosInstance.get(
      "/Comprobante/verificar-comprobante",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          comprobante: comprobante, 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};



export const consultarComprobanteGeneral = async (comprobante, token) => {
  try {
    const response = await axiosInstance.post(
      "/Comprobante/consultar-comprobante-general",
      comprobante,
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

export const consultarComprobanteGeneralSupervisores = async (comprobante, token) => {
  try {
    const response = await axiosInstance.post(
      "/Comprobante/consultar-comprobante-general-supervisores",
      comprobante,
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


export const reversarComprobanteGeneral = async (comprobante, token) => {
  try {
    const response = await axiosInstance.post(
      "/Comprobante/reversar-comprobante-general",
      comprobante,
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

export const editarComprobante = async (comprobante, token) => {
  try {
    const response = await axiosInstance.post(
      "/Comprobante/edicion-beneficiario",
      comprobante,
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