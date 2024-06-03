import { useParams } from "react-router-dom";
import { useGetHotelQuery } from "../../../slices/hotelApiSlice";
import { AiFillStar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../../context/searchContext";
import { useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

function HotelDetails() {
  const search = useSearchContext();

  const { userInfo } = useAppSelector((state) => state.userSlice);

  const navigate = useNavigate();

  const { id } = useParams();

  const { data: hotel, isLoading } = useGetHotelQuery(id!);

  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    // @ts-ignore
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search?.checkIn,
      checkOut: search?.checkOut,
      adultCount: search?.adultCount,
      childCount: search?.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();

  maxDate.setFullYear(maxDate.getFullYear() + 1);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const onSignInClick = () => {
    const submit = handleSubmit(async (data: GuestInfoFormData) => {
      console.log("Hello Pasta");
      search?.saveSearchValues(
        "",
        data.checkIn,
        data.checkOut,
        data.adultCount,
        data.childCount
      );
      navigate("/auth/login", { state: { from: location } });
    });
    submit();
  };

  const onSubmit = () => {
    const submit = handleSubmit(async (data: GuestInfoFormData) => {
      search?.saveSearchValues(
        "",
        data.checkIn,
        data.checkOut,
        data.adultCount,
        data.childCount
      );
      navigate(`/hotels/${id}/booking`);
    });

    submit();
  };

  return (
    <>
      <div className="min-w-screen flex justify-center items-center">
        <div className="max-w-[900px] pt-10 pb-28 px-5 md:px-2">
          <div className="flex gap-2 items-center">
            <span className="flex">
              {Array.from({ length: hotel?.starRating! }).map(
                (_val, idx: number) => {
                  return <AiFillStar key={idx} className="fill-yellow-400" />;
                }
              )}
            </span>
            <span className="text-sm text-gray-500">{hotel?.type}</span>
          </div>
          <h2 className="text-3xl font-bold">{hotel?.name}</h2>
          <div className="grid grid-cols-12 gap-2 my-2">
            {hotel?.imgsURLs.map((img, idx) => {
              return (
                <div className="col-span-12  md:col-span-4 w-58 h-46 shadow-md overflow-hidden">
                  <img
                    className="w-full h-full"
                    key={idx}
                    src={img}
                    alt={`hotel-image-${idx}`}
                  />
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-12 gap-3 mt-5 mb-2">
            {hotel?.facilities.map((facility, idx) => {
              return (
                <div
                  className="border border-secondaryMain col-span-6 md:col-span-3 p-2"
                  key={idx}
                >
                  <p>{facility}</p>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-12 mt-10 mb-2">
            <div className="md:col-span-8 col-span-12 p-2">
              <p>{hotel?.description}</p>
            </div>
            <div className="col-span-12 md:col-span-4 bg-secondaryMain bg-opacity-75 pt-1 pb-3 my-2">
              <p className="font-bold text-md text-white my-2 text-center">
                Rs.{hotel?.pricePerNight} per night{" "}
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  userInfo === null ? onSignInClick() : onSubmit();
                }}
                className="justify-center flex flex-col items-center gap-2 text-black"
              >
                <div className="flex items-center  justify-center gap-1 bg-white w-fit px-1">
                  <label className="flex  p-1 items-center  w-fit bg-white m-0">
                    Adult:
                    <input
                      min={1}
                      max={20}
                      className=" searchInputs w-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      {...register("adultCount", {
                        required: "This field is required",
                        min: {
                          value: 1,
                          message: "There must be atleast one adult",
                        },
                      })}
                    />
                  </label>
                  <label className="flex  p-1 items-center w-fit bg-white m-0 ">
                    Children:
                    <input
                      min={0}
                      max={20}
                      className="searchInputs  w-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      {...register("childCount", {
                        valueAsNumber: true,
                      })}
                    />
                    {/* Complete the functionality of form */}
                  </label>
                </div>
                <label className="flex p-1 items-center w-fit bg-white m-0 ">
                  <DatePicker
                    required
                    className="searchInputs px-1 w-[202px]"
                    selected={checkIn}
                    onChange={(date) => setValue("checkIn", date!)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-In Date"
                  />
                </label>
                <label className="flex p-1 items-center w-fit bg-white m-0 ">
                  <DatePicker
                    required
                    className="searchInputs px-1 w-[202px]"
                    selected={checkOut}
                    onChange={(date) => setValue("checkOut", date!)}
                    selectsEnd
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-Out Date"
                  />
                </label>
                {userInfo !== null ? (
                  <button
                    className="bookNow bg-blue-500 hover:!bg-#0000ffd4 my-2"
                    type="submit"
                  >
                    Book Now
                  </button>
                ) : (
                  <button
                    className="bookNow bg-blue-500 hover:!bg-#0000ffd4 my-2"
                    type="submit"
                  >
                    Sign In To Book
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HotelDetails;
