import axios, { type AxiosResponse } from "axios";
import { ROUTER } from "../router";
import { SwalHelper } from "../helpers/Swal";

export const BASE_API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const GlobalErrors = async <T>(
  axiosParameter: any
): Promise<T | null> => {
  try {
    const resp: AxiosResponse<T> = await axiosParameter();
    return resp.data;
  }
  catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
        case 400: // COMMON ERRORS
        case 404: // NOT FOUND
        case 422: // FORM GROUP ERRORS
          SwalHelper.error(JSON.stringify(error.response.data));
          break;

        case 401: // USUARIO SIN LOGIN
        case 403: // USUARIO NO PERMITIDO
        case 426: // TOKEN NO VALIDO - TOKEN EXPIRADO
          ROUTER.LOGIN();
          break;

        // OTROS
        default:
          SwalHelper.error("Por favor comuníquese con Sistemas");
          break;
      }
    }
    console.error(error.message);
    return null;
  }
};
