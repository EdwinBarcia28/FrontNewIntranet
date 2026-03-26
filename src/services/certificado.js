import axiosInstance from "@/lib/axios";


export const certificadoRequest = async (token) => {
  try {
    const response = await axiosInstance.get("/Certificados/info-certificado", {
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

export const searchCertificadoRequest = async (certificado, token) => {
  try {
    const response = await axiosInstance.post(
      "/Certificados/info-certificado-filtro",
      certificado,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar consultar los certificados pendiente: ${error}`);
    throw error;
  }
};

export const validarCertificadoRequest = async (certificado, token) => {
  try {
    const response = await axiosInstance.post(
      "/Certificados/resolver-solicitud-defuncion",
      certificado,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar consultar los certificados pendiente: ${error}`);
    throw error;
  }
};