import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/hooks";
import { setUserInfo } from "../../slices/userSlice";
import { useLoginUserMutation } from "../../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SignIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<signinTypes>();

  const dispatch = useAppDispatch();
  const [userSignIn] = useLoginUserMutation();
  const navigate = useNavigate();

  const signinHandler = handleSubmit(async (data) => {
    try {
      const res = await userSignIn(data).unwrap();
      dispatch(setUserInfo(res));
      toast.success("User Signed In");
      navigate("/");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  });

  return (
    <div className="flex px-4 justify-center flex-col items-center min-h-screen">
      <div className="flex flex-col justify-center py-10 px-5 gap-5 border rounded-md bg-slate-200 border-tertiaryMain max-w-[600px] min-w-[340px]">
        <h2 className="text-2xl font-semibold">Sign In</h2>
        <form
          className="registerForm flex justify-center flex-col w-full"
          onSubmit={signinHandler}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-sm -mt-2 mb-2 text-red-600 block">
              {errors.email.message}
            </span>
          )}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be of 6 characters atleast",
              },
            })}
          />
          {errors.password && (
            <span className="text-sm -mt-2 mb-2 text-red-600 block">
              {errors.password.message}
            </span>
          )}
          <button type="submit" className="btn text-secondaryMain mt-5 ">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
export default SignIn;
