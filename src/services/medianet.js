import axiosInstance from "@/lib/axios";


export const tipoComboRequest = async (token) => {
  try {
    const response = await axiosInstance.get("/Search/info-tipo-combo", {
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

export const registerComboRequest = async (combo, token) => {
  try {
    const response = await axiosInstance.post(
      "/Combo/register-combos",
      combo,
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

export const updateComboRequest = async (combo, token) => {
  try {
    const response = await axiosInstance.post(
      "/Combo/update-register-combos",
      combo,
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

export const searchComboRequest = async (combo, token) => {
  try {
    const response = await axiosInstance.post(
      "/Combo/search-combos",
      combo,
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

export const searchDetalleComboRequest = async (codigo, token) => {
  try {
    const response = await axiosInstance.get(
      "/Combo/search-detalle-combos",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          codigo: codigo,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error al registrar el Conductor: ${error}`);
    throw error;
  }
};

export const anularComboRequest = async (combo, token) => {
  try {
    const response = await axiosInstance.post(
      "/Combo/anular-register-combos",
      combo,
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