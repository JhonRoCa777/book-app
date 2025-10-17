import { Navigate, Outlet } from "react-router-dom"
import { Role } from "../../models/Role"
import { AuthStore } from "../../store"
import { ROUTER } from "../../router"

export const AdminGuard = () => {
  return (AuthStore().role === Role.ADMIN) ? <Outlet/> : <Navigate replace to={ROUTER.HOME.MAIN}/>
}
