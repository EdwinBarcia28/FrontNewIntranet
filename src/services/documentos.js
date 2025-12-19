import axiosInstance from "@/lib/axios";

export const registerDocumentoJuridico = async (documento, token) => {
  try {
    const response = await axiosInstance.post(
      "/Juridico/register-documentos",
      documento,
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

export const updateDocumentoJuridico = async (documento, token) => {
  try {
    const response = await axiosInstance.post(
      "/Juridico/update-register-document",
      documento,
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

export const anularDocumentoJuridico = async (documento, token) => {
  try {
    const response = await axiosInstance.post(
      "/Juridico/anular-register-document",
      documento,
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

export const searchDocumentsRequest = async (comprobante, token) => {
  try {
    const response = await axiosInstance.post(
      "/Juridico/info-document",
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

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Ejemplo: data:application/pdf;base64,JVBERi0x...
      const base64String = reader.result.split(",")[1]; 
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};


export const tipoTramiteRequest = async (token) => {
  try {
    const response = await axiosInstance.get("/Search/info-tipo-tramite", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(`Error al obtener los tipos de combo: ${error}`);
    throw error;
  }
}

export const tipoArchivoRequest = async (token) => {
  try {
    const response = await axiosInstance.get("/Search/info-tipo-archivo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(`Error al obtener los tipos de combo: ${error}`);
    throw error;
  }
}