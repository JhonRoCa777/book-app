import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AuthStore } from "../../store";
import { AuthService } from "../../services/Auth";
import { SpinnerFullScreen } from "../../components/Spinner/FullScreen";

export const AuthGuard = () => {
  const { me } = AuthService();
  const getAuth = async () => await me();

  useEffect(() => {
    getAuth();
  }, []);

  return (AuthStore().role.length > 0) ? <Outlet/> : <SpinnerFullScreen/>
}
