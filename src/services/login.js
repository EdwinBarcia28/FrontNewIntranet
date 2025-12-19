import axiosInstance from "@/lib/axios";

export const loginRequest = async (userDto) => {
  
  try {
    const response = await axiosInstance.post("Login/authenticate", userDto, {
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
    console.log(`Error al Iniciar Sesion: ${error}`);
    return null;
  }
};