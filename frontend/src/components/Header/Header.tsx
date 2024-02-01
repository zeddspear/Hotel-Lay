import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logout } from "../../slices/userSlice";
import { useLogoutUserMutation } from "../../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Header() {
  const { userInfo } = useAppSelector((state) => state.userSlice);

  const dispatch = useAppDispatch();

  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async function () {
    try {
      await logoutUser(null).unwrap();
      dispatch(logout());
      toast.success("User Signed Out");
      navigate("auth/login");
    } catch (error: any) {
      console.log(error.data.message);
    }
  };

  return (
    <div className="flex px-5 sm:px-10 py-4 bg-secondaryMain border-b-2 border-tertiaryMain text-white justify-between items-center w-[100%]">
      <div className="flex-1">
        <h1 className="text-2xl sm:text-3xl  tracking-tight font-bold">
          <Link to={"/"}>Hotel&Lay</Link>
        </h1>
      </div>
      {userInfo === null ? (
        <div className="text-secondaryMain justify-end items-center gap-5 flex flex-1">
          <Link className="btn" to={"/auth/login"}>
            Sign In
          </Link>
          <Link className="btn" to={"/auth/register"}>
            Register
          </Link>
        </div>
      ) : (
        <div className="text-secondaryMain justify-end items-center gap-5 flex flex-1">
          <Link to={"/mybookings"} className=" text-white">
            My Bookings
          </Link>
          <Link to={"/myhotels"} className=" text-white">
            My Hotels
          </Link>
          <Link to={"/"} className="btn" onClick={logoutHandler}>
            Sign Out
          </Link>
        </div>
      )}
    </div>
  );
}
export default Header;
