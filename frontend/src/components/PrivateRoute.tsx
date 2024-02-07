import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

function PrivateRoute() {
  const { userInfo } = useAppSelector((state) => state.userSlice);

  return <>{userInfo ? <Outlet /> : <Navigate to={"/auth/login"} />}</>;
}
export default PrivateRoute;
