import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../../slices/userApiSlice";
import { useAppDispatch } from "../../store/hooks";
import { setUserInfo } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

function Register() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<registerTypes>();

  const [userExistsErr, setUserExistsErr] = useState<string>("");

  const [registerUser] = useRegisterUserMutation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const registerHandler = handleSubmit(async (data: registerTypes) => {
    const submittedUser: registerTypes = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await registerUser(submittedUser).unwrap();
      dispatch(setUserInfo(res));
      toast.success("User Registered");
      navigate("/");
    } catch (error: any) {
      setUserExistsErr(error.data.message);
      toast.error(error.data.message);
    }
  });

  return (
    <div className="flex px-4 justify-center flex-col items-center min-h-screen">
      <div className="flex flex-col justify-center p-5 gap-5 border rounded-md bg-slate-200 border-tertiaryMain max-w-[600px] min-w-[340px]">
        <h2 className="text-2xl font-semibold">Create an Account</h2>
        <form
          className="registerForm flex justify-center flex-col w-full"
          onSubmit={registerHandler}
        >
          <div className="flex flex-col sm:flex-row sm:gap-3 w-full ">
            <div className="w-full sm:w-auto">
              <label htmlFor="firstname" className="block">
                First name
              </label>
              <input
                className="sm:w-auto w-full"
                type="text"
                id="firstname"
                {...register("firstname", {
                  required: "First name is required",
                })}
              />
              {errors.firstname && (
                <span className="text-sm -mt-2 mb-2 text-red-600 block">
                  {errors.firstname.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="lastname" className="block">
                Last name
              </label>
              <input
                className="sm:w-auto w-full"
                type="text"
                id="lastname"
                {...register("lastname", {
                  required: "Last name is required",
                })}
              />
              {errors.lastname && (
                <span className="text-sm -mt-2 mb-2 text-red-600 block">
                  {errors.lastname.message}
                </span>
              )}
            </div>
          </div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
            })}
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              validate: (value: string | undefined) => {
                if (!value) {
                  return "Confirm Password is required";
                } else if (watch("password") !== value) {
                  return "Password and Confirm Password does not match";
                }
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-sm -mt-2 mb-2 text-red-600 block">
              {errors.confirmPassword.message}
            </span>
          )}
          <br />
          {userExistsErr !== "" && (
            <span className="text-sm text-center mt-2 mb-2 text-red-600 block">
              {userExistsErr}
            </span>
          )}
          <button type="submit" className="btn text-secondaryMain mt-5">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default Register;
