import { useDispatch } from "react-redux";
import type { Auth } from "../../models/Auth";
import { BASE_API, GlobalErrors } from "../../boot/axios";
import { resetAuthStore, setAuthStore } from "../../store/Auth";
import { SwalHelper } from "../../helpers/Swal";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../router";
import type { Credentials } from "../../models/Credentials";

export function AuthService() {

  const CONTROLLER = '/auth';
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  return {
    login: async (credentials: Credentials) => {
      const RESP = await GlobalErrors<boolean>(() => BASE_API.post(`${CONTROLLER}/login`, credentials));
      if(RESP){
        SwalHelper.success('Bienvenido');
        navigate(ROUTER.HOME.MAIN);
      }
    },

    me: async () => {
      const RESP = await GlobalErrors<Auth>(() => BASE_API.get(`${CONTROLLER}/me`));
      if(RESP) dispatcher(setAuthStore(RESP));
    },

    logout: async () => {
      const RESP = await GlobalErrors<boolean>(() => BASE_API.get(`${CONTROLLER}/logout`));
      if (RESP) {
        dispatcher(resetAuthStore());
        ROUTER.LOGIN();
      }
    }
  }
}
